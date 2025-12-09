import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';

/**
 * необходимо вынести тип в отдельную папку с типами, чтобы использовать и в других местах
 * Также следует переименовать тип, например, TodoType
 * нужно добавить в тип id для уникальности тудушек
 */
type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}
type MainAppState = {
    todoTitle: string
};

/**
 * стоит переписать на хуки, будет более лаконичный и читаемый код, удобнее работать
 * следует убрать всю логику добавления туду в компонент InputNewTodo (handleTodoTitle, handleSubmitTodo), там использовать useDispatch
 */
class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }

    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        const { todoTitle } = this.state;
        /**
         * необходимо вынести расчеты в функцию и вызывать ее, вместо window использовать переменную
         * при расчете вместо мап использовать every
         * */
        window.allTodosIsDone = true;
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            <div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {/* вынести в отдельный компонент TodoList, todos доставать из сторы с помощью createSelector */}
                {this.props.todos.map((t, idx) => (
                    // необходимо добавить key для корректной работы рендеринга списка todo
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                            // лучше вынести стили в css файл
                            style={{ marginTop: -8, marginLeft: 5 }}
                            // нужно вынести функцию onChange в отдельную функцию выше
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                            const changedTodos = this.props.todos.map((t, index) => {
                                // данная строка не несет определенного смысла, нужно удалить ее
                                const res = { ...t }
                                // при сравнении использовать id todo
                                if (index == idx) {
                                    // стоит вернуть новый объект с обновленным isDone
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            {/* следует использовать dispatch c экшеном */}
                            this.props.changeTodo(changedTodos)

                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

// убрать после рефакторинга классовых компонентов
export default connect(
    (state) => ({}),
    (dispatch) => ({
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
