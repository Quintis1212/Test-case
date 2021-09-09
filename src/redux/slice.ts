import { createSlice, current } from '@reduxjs/toolkit'


// Define a type for the slice state
interface CounterState {
  value: Array<any>;
  staticValue: Array<any>;
  filterLabels: {
    types: Array<string>,
    status: Array<string>,
  },
  currentPage: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  staticValue: [],
  value: [],
  filterLabels: {
    types: [],
    status: [],
  },
  currentPage: 1,
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetchCVSFile: (state, payload) => {
      console.log(state, payload)
      const statusFilterLabels: Array<string> = [];
      const typeFilterLabel: Array<string> = [];
      payload.payload.users.forEach((item: string, i: number) => {
        if (i === 0) return;
        const type = item.split(",")[2];
        const status = item.split(",")[1];
        if (!typeFilterLabel.includes(type)) {
          typeFilterLabel.push(type);
        }
        if (!statusFilterLabels.includes(status)) {
          statusFilterLabels.push(status);

        }

      })

      state.filterLabels = {
        types: typeFilterLabel,
        status: statusFilterLabels,
      }
      state.staticValue = payload.payload.users
      state.value = payload.payload.users
    },
    getData: () => {
      console.log('getData')
    },
    deleteItem: (state, action) => {
      const currentList = current(state).value;
      // eslint-disable-next-line array-callback-return
      const filteredList = currentList.filter((item: string) => {
        const ID = item.split(",")[0]
        if (ID !== action.payload) {
          return item;
        }
      })
      state.value = filteredList
    },
    changeTransaction: (state, action) => {
      const currentList = current(state).value;
      state.value = currentList.map((item: string) => {
        const ID = item.split(",")[0]
        if (ID === action.payload.id) {
          const newItem = item.split(",")
          newItem[1] = action.payload.text;
          return newItem.join(",")
        }
        return item
      })
    },
    filterByTypeAndStatus: (state, action) => {
      const currentList = current(state).staticValue;
      // eslint-disable-next-line array-callback-return
      const filteredList = currentList.filter((item: string) => {
        const status = item.split(",")[1]
        const type = item.split(",")[2]
        console.log(status, action.payload.status)
        console.log(type, action.payload.type)

        if ((status === action.payload.status || action.payload.status === 'ALL')
          && (type === action.payload.type || action.payload.type === 'ALL')) {
          return item
        }
      })
      console.log(filteredList)
      state.value = filteredList;
      state.currentPage = 1;
    },
    setDataFromFile: (state, action) => {
      state.value = action.payload;
      state.staticValue = action.payload;
    },
    setPageNumber: (state, action) => {
      state.currentPage = action.payload
    }


  },
})

export const { setPageNumber, setDataFromFile, filterByTypeAndStatus, getData, fetchCVSFile, deleteItem, changeTransaction } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default counterSlice.reducer

