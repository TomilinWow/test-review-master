import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    /**
     * можно использовать createSlice, так будет меньше кода и с этим удобно работать (редьюсеры, экшены),
     * необходимо указать тип стейта и action
     * */
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {
                    const newState = state;
                    // нельзя мутировать состояние, необходимо создавать новый массив todos
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        /**
                         * можно убрать типизацию, типы подтянутся сами
                         * использовать понятные названия аргументов (t -> todo)
                         * вместо индекса использовать id todo
                         * */
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
