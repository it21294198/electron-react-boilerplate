import { Link } from 'react-router-dom';
import '../styles/routes-view.css'

function RouterView() {
  return (
    <div className='router-view'>
      <div className='router'>
        <Link to="/home">Home</Link>
      </div>
      <div className='router'>
        <Link to="/view-bill-create">Make a bill</Link>
      </div>
      <div className='router'>
        <Link to="/view-bill-history">View bill History</Link>
      </div>
      <div className='router'>
        <Link to="/reminder">Remider</Link>
      </div>
      <div className='router'>
        <Link to="/add-product">Add a Product</Link>
      </div>
      <div className='router'>
        <Link to="/overview">OverView</Link>
      </div>
    </div>
  );
}

export default RouterView;
