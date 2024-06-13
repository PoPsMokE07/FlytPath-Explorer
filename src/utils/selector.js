import { createSelector } from "reselect";
const pathBaseState = (state) => state.path;
export const selector = createSelector(pathBaseState, (pathState) => ({
  paths: pathState.paths,
}));
