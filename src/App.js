
import { useSortAble } from './effect'

import styles from './App.module.css';


function App() {
  const {
    baseComponentWrapRef,
    canvarsWrapRef
  } = useSortAble();

  return (
    <div className={styles['app']}>
      <div className={styles['baseWrap']} ref={baseComponentWrapRef}>
        <div data-foo="abcf">123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </div>
      <div className={styles['canvarsWrap']} ref={canvarsWrapRef}>
        <div>dadadadadada</div>
        <div>dadadadadada</div>
        <div>dadadadadada</div>
      </div>
      <div className={styles['editorWrap']}>右</div>
    </div>
  );
}

export default App;
