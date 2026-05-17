/**
 * Универсальный метод для инициализации горизонтальной прокрутки перетаскиванием (ось X)
 * @param {HTMLElement} element - Элемент, который нужно сделать прокручиваемым
 */
function initDragScrollX(element) {
  if (!element) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let moved = false;

  element.addEventListener('mousedown', (e) => {
    isDown = true;
    moved = false;
    element.classList.add('is-dragging');
    
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });

  const endDrag = () => {
    if (!isDown) return;
    isDown = false;
    element.classList.remove('is-dragging');
  };

  element.addEventListener('mouseleave', endDrag);
  element.addEventListener('mouseup', endDrag);

  element.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX); // Скорость 1:1
    
    if (Math.abs(walk) > 5) {
      moved = true;
      e.preventDefault();
    }
    
    element.scrollLeft = scrollLeft - walk;
  });

  // Блокировка кликов по ссылкам при перетаскивании
  element.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
    }
  });
}

/**
 * Автоматическая инициализация всех элементов с атрибутом data-drag-scroll-x
 */
document.addEventListener('DOMContentLoaded', () => {
  const dragElementsX = document.querySelectorAll('[data-drag-scroll-x]');
  dragElementsX.forEach(el => initDragScrollX(el));
});
