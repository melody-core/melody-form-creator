
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
        <div data-foo="abcf">123432</div>
        <div data-foo="abcf">232432</div>
        <div data-foo="abcf">343242345</div>
      </div>
      <div className={styles['canvarsWrap']} ref={canvarsWrapRef}>
      </div>
      <div className={styles['editorWrap']}>右</div>
    </div>
  );
}

export default App;
