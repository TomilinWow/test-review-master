import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    // следует использовать айди туду вместо индексов
    idx: number,
}

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    /**
     * для удобного взаимодействия с данными из сторы можно использовать createSelector
     * необходимо заменить тип any на тип TodoType
     * */
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    /**
     * следует добавить новый слайс users и использовать createAsyncThunk (можно effects из rxjs) запроса юзеров.
     * эффект с диспатчем вынести в MainApp, здесь нужно удалить
     * */
    React.useEffect(
        () => {
            console.log('userSelect');
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    // необходимо указать тип стейта
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        /**
         * использовать понятные названия аргументов (t -> todo)
         * вместо индекса использовать id todo
         * */
        const changedTodos = todos.map((t, index) => {
            // данная строка не несет определенного смысла, нужно удалить ее
            const res = { ...t }
            // при сравнении использовать id todo
            if (index == idx) {
                // почистить консоль лог, если он нужен, дать комментарий
                console.log('props.user', props.user);
                // стоит вернуть новый объект с обновленным user
                res.user = e.target.value;
            }
            return res;
        })
        // исправить опечатку CHANGE_TODO на CHANGE_TODOS
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
            {/* Убрать any, тип подтянется сам после указания типа стейта. Также не хватает key */}
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
