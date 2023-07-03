import { createSlice } from '@reduxjs/toolkit';
import {
  layoutModeTypes,
  layoutPositionTypes,
  layoutTypes,
  layoutWidthTypes,
  leftSideBarSizeTypes,
  leftSidebarImageTypes,
  leftSidebarTypes,
  leftSidebarViewTypes,
  preloaderTypes,
  topbarThemeTypes
} from "../../Components/constants/layout";

import { LayoutState, name } from './types';

const initialState: LayoutState = {
  layoutType: layoutTypes.HORIZONTAL,
  leftSidebarType: leftSidebarTypes.LIGHT,
  layoutModeType: layoutModeTypes.LIGHT_MODE,
  layoutWidthType: layoutWidthTypes.FLUID,
  layoutPositionType: layoutPositionTypes.FIXED,
  topbarThemeType: topbarThemeTypes.DARK,
  leftSideBarSizeType: leftSideBarSizeTypes.DEFAULT,
  leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
  leftSidebarImageType: leftSidebarImageTypes.NONE,
  preloader: preloaderTypes.DISABLE,
  headerSize: {
    height: 80,
    width: 80
  }
};

const layoutSlice = createSlice({
  name,
  initialState,
  reducers: {
    changeLayout: (state, action) => {
      state.layoutType = action.payload;
    },
    changeLayoutMode: (state, action) => {
      state.layoutModeType = action.payload;
    },
    changeSidebarTheme: (state, action) => {
      state.leftSidebarType = action.payload;
    },
    changeLayoutWidth: (state, action) => {
      state.layoutWidthType = action.payload;
    },
    changeLayoutPosition: (state, action) => {
      state.layoutPositionType = action.payload;
    },
    changeTopbarTheme: (state, action) => {
      state.topbarThemeType = action.payload;
    },
    changeSideBarSizeType: (state, action) => {
      state.leftSideBarSizeType = action.payload;
    },
    changeSideBarView: (state, action) => {
      state.leftSidebarViewType = action.payload;
    },
    changeSidebarImageType: (state, action) => {
      state.leftSidebarImageType = action.payload;
    },
    changeHeaderSize: (state, action) => {
      state.headerSize = action.payload;
    },
    resetValue: (state) => {
      return initialState;
    },
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    }
  }
});

export const {
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeSideBarSizeType,
  changeSideBarView,
  changeSidebarImageType,
  resetValue,
  changePreloader,
  changeHeaderSize,
} = layoutSlice.actions;

export default layoutSlice.reducer;
