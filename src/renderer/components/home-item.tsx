import '../styles/home-item.css'
import logo from '../../../assets/logo.png'

function HomeItem({title}:any) {
    return (
    <div className='home-item'>
    <div className="home-item-container">
        <div>item name</div>
        <div>item price</div>
        <div>quntity</div>
        <div>{title}</div>
    </div> 
        <img src={logo} width="100px"/>
    </div> 
    );
}

export default HomeItem;