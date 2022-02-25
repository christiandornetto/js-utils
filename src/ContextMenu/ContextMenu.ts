export class ContextMenu {
  constructor(menuElement: HTMLElement, configuration: IContextMenuConfiguration, target: HTMLElement, args: object) {
    menuElement.classList.add(configuration.css.contextMenuClass);
    menuElement.oncontextmenu = e => e.preventDefault();
    target.oncontextmenu = null;
    target.addEventListener('contextmenu', e => {
      const type = (e.target as HTMLElement).tagName;
      if (type === 'INPUT' || type === 'SELECT') {
        return;
      }

      e.stopPropagation();
      e.preventDefault();
      menuElement.innerHTML = '';

      configuration.data.options?.forEach(o => {
        const item = menuElement.appendChild(document.createElement('li'));
        const option = item.appendChild(document.createElement('button'));
        option.classList.add(configuration.css.menuItemClass);

        if (o.iconClassList) {
          const icon = option.appendChild(document.createElement('i'));
          icon.classList.add(...o.iconClassList);
        }

        const content = option.appendChild(document.createElement('div'));
        content.classList.add(configuration.css.menuItemContentClass);

        const label = content.appendChild(document.createElement('span'));
        label.textContent = o.label;

        if (o.hint) {
          const hint = content.appendChild(document.createElement('span'));
          hint.classList.add(configuration.css.menuItemHintClass);
          hint.textContent = o.hint;
        }

        option.addEventListener('click', e => configuration.callback.call(this, { event: e, key: o.key, ...args }));
        option.addEventListener('click', () => menuElement.classList.remove(configuration.css.activeClass));
      });

      const { normalisedX, normalisedY } = NormalisePosition(e.x, e.y, menuElement);
      menuElement.style.left = `${normalisedX}px`;
      menuElement.style.top = `${normalisedY}px`;
      menuElement.classList.remove(configuration.css.activeClass);

      setTimeout(() => {
        menuElement.classList.add(configuration.css.activeClass);
      });
    });

    document.body.addEventListener('click', e => {
      if ((e.target as HTMLElement).offsetParent != menuElement) {
        e.stopPropagation();
        menuElement.classList.remove(configuration.css.activeClass);
      }
    });
  }
}

function NormalisePosition(x: number, y: number, menuElement: HTMLElement, scope: HTMLElement = document.body) {
  const { left: scopeOffsetX, top: scopeOffsetY } = scope.getBoundingClientRect();

  const scopeX = x - scopeOffsetX;
  const scopeY = y - scopeOffsetY;

  const outOfBoundOnX = scopeX + menuElement.clientWidth > scope.clientWidth;
  const outOfBoundOnY = scopeY + menuElement.clientHeight > scope.clientHeight;

  let normalisedX = x;
  let normalisedY = y;

  if (outOfBoundOnX) {
    normalisedX = scopeOffsetX + scope.clientWidth - menuElement.clientWidth;
  }

  if (outOfBoundOnY) {
    normalisedY = scopeOffsetY + scope.clientHeight - menuElement.clientHeight;
  }

  return { normalisedX, normalisedY };
}

interface IContextMenuConfiguration {
  data: IContextMenuData;
  css: IContextMenuStyle;
  callback: Function;
}

interface IContextMenuStyle {
  contextMenuClass: string;
  activeClass: string;
  menuItemClass: string;
  menuItemContentClass: string;
  menuItemHintClass: string;
}

interface IContextMenuData {
  options: IContextMenuOption[];
}

interface IContextMenuOption {
  key: string;
  label: string;
  hint?: string;
  iconClassList?: string[];
  callback?: Function;
}
