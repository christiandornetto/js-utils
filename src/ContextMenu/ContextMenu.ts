export class ContextMenu {
  constructor(menuElement: HTMLElement, configuration: IContextMenuConfiguration, scope: HTMLElement, ...args: any[]) {
    menuElement.classList.add(configuration.css.contextMenuClass);
    scope.oncontextmenu = null;
    scope.addEventListener('contextmenu', e => {
      e.stopPropagation();
      e.preventDefault();
      menuElement.innerHTML = '';

      configuration.data.options?.forEach(o => {
        const item = menuElement.appendChild(document.createElement('li'));
        const option = item.appendChild(document.createElement('button'));
        if (o.iconClassList) {
          const icon = option.appendChild(document.createElement('i'));
          icon.classList.add('item-icon', ...o.iconClassList);
        }
        option.classList.add(configuration.css.contextMenuItemClass);
        const label = option.appendChild(document.createElement('span'));
        label.textContent = o.label;
        if (o.callback) {
          option.addEventListener('click', e => o.callback?.call(this, args));
        }
        option.addEventListener('click', () => menuElement.classList.remove(configuration.css.activeClass));
      });

      const { normalisedX, normalisedY } = NormalisePosition(e.x, e.y, menuElement, scope);
      menuElement.style.left = `${normalisedX}px`;
      menuElement.style.top = `${normalisedY}px`;
      menuElement.classList.remove(configuration.css.activeClass);

      setTimeout(() => {
        menuElement.classList.add(configuration.css.activeClass);
      });
    });

    scope.addEventListener('click', e => {
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
}

interface IContextMenuStyle {
  contextMenuClass: string;
  activeClass: string;
  contextMenuItemClass: string;
}

interface IContextMenuData {
  options: IContextMenuOption[];
}

interface IContextMenuOption {
  label: string;
  iconClassList?: string[];
  callback?: Function;
}
