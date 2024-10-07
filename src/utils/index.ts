import { CELLS_ON_AXIS_IN_GROUP, GROUPS_ON_AXIS_IN_FIELD } from 'constants/playing-field';

export const getGridLinesQuantity = (): number => GROUPS_ON_AXIS_IN_FIELD - 1;
export const getSubgridLinesQuantity = (): number => CELLS_ON_AXIS_IN_GROUP - 1;
