import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"
import { IService } from "@/types"
import { get, transformToMinutes } from "@/utils/helpers"
import { modalOpen } from "./uiSlice"
import { MODALS } from "@/config"
import { notification } from "antd"

export interface IState {
  data: IService[]
}

const initialState: IState = {
  data: [],
}

const normalizeService = (item: IService) => {
  return {
    ...item,
    minutes: transformToMinutes(item?.duration),
    price: (item?.price || '').split('.')[0],
    old_price: (item?.instead || '').split('.')[0],
  };
};

export const fetchServices = createAsyncThunk(
  "services/fetch",
  async (params, thunkAPI) => {
    try {
      return await clientFetch('/services').then((res: any) => {
        return res?.map(normalizeService);
      }
      );
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const buyService = createAsyncThunk(
  "checkouts",
  async ({ id, content_type_id, promo_id, isAuth, t, successUrl }: any, { rejectWithValue, getState, dispatch }) => {
    if (!isAuth) {
      dispatch(modalOpen({ id: MODALS.auth }))
      return false
    }

    const data = {
      product_object_id: id,
      product_content_type: content_type_id,
      promo: promo_id,
      success_url: successUrl,
    };

    try {
      return await clientFetch('/payment/create', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then((res: any) => {
        if (res?.billing_url) {
          window.location.href = res.billing_url;
        } else {
          throw new Error();
        }
      });
    } catch (error: any) {
      notification.error({
        message: get(error, ["errors", "details"], t('cabinet.default_error_message')),
      })
    }
  },
)

export const buyCertificate = createAsyncThunk(
  "certificate/buy",
  async ({ id, t }: any, { rejectWithValue, getState, dispatch }) => {
    const data = {
      service_id: id,
    };

    try {
      return await clientFetch('/checkouts/certificate', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then((res: any) => {
        if (res?.invoiceId) {
            localStorage.setItem('invoiceId', res.invoiceId)
        }
        if (res?.billing_url) {
          window.location.href = res.billing_url;
        } else {
          throw new Error();
        }
      });
    } catch (error: any) {
      notification.error({
        message: get(error, ["errors", "details"], t('cabinet.default_error_message')),
      })
    }
  },
)

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    activatePromocode: (state, action) => {
      const { products, promo_id } = action.payload || {};
      const changedProducts = products
        .map((item: any) => ({ ...normalizeService(item), promo_id }))
        .reduce((a: any, c: any) => {
          a[c.id] = c;
          return a;
        }, {});
      state.data = (state.data || [])?.map(item => {
        if (!!changedProducts[item?.id]) {
          return {...changedProducts[item?.id], old_price: item?.price};
        }
        return item
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state, action) => {})
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.data = action.payload as any;
      })
      .addCase(fetchServices.rejected, (state, action: any) => {});
  },
});

export const getServices = (state: RootState) => state.services.data
export const { activatePromocode } = servicesSlice.actions;
export default servicesSlice.reducer
