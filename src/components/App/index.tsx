import React from 'react';
// необходимо почистить импорты
import logo from '../../logo.svg';
import './App.css';
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';

function App() {
  /**
   * для удобного взаимодействия с данными из сторы можно использовать createSelector
   * необходимо заменить тип any на тип TodoType
   * следует убрать его в компонент MainApp, нет нужды в прокидывании его через пропсы
   * */
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
  return (
      // туду лист для юзеров:
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/* если эта строка нужна, оставь пояснение в комментарии */}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
        {/* MAIN APP: */}
        <MainApp todos={todos}/>

        <footer className='App-footer'>
          {/* убрать лишние отступы (при разработке использовать prettier) */}
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
