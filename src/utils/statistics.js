import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {Color} from "../const.js";

dayjs.extend(isBetween);

export const colorToHex = {
  [Color.BLACK]: `#000000`,
  [Color.BLUE]: `#0c5cdd`,
  [Color.GREEN]: `#31b55c`,
  [Color.PINK]: `#ff3cb9`,
  [Color.YELLOW]: `#ffe125`
};

// Используем особенности Set, чтобы удалить дубли в массиве
export const makeItemsUniq = (items) => [...new Set(items)];

export const countTasksByColor = (tasks, color) => {
  return tasks.filter((task) => task.color === color).length;
};

export const countCompletedTaskInDateRange = (tasks, dateFrom, dateTo) => {
  return tasks.reduce((counter, task) => {
    if (task.dueDate === null) {
      return counter;
    }

    // С помощью day.js проверям, сколько задач с дедлайном
    // попадают в диапазон дат
    if (
      dayjs(task.dueDate).isSame(dateFrom) ||
      dayjs(task.dueDate).isBetween(dateFrom, dateTo) ||
      dayjs(task.dueDate).isSame(dateTo)
    ) {
      return counter + 1;
    }

    return counter;
  }, 0);
};
