import { CELLS_IN_ZONE_ON_AXIS, ZONES_ON_AXIS } from 'constants/board';

export const getGridLinesQuantity = (): number => ZONES_ON_AXIS - 1;
export const getSubgridLinesQuantity = (): number => CELLS_IN_ZONE_ON_AXIS - 1;
