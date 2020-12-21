import ColumnResizer from "./ColumnResizer";
import GridGroup from "./GridGroup";

class Column extends GridGroup {
    className = 'rubber-dock__column';
    resizer = ColumnResizer;
}

export default Column;
