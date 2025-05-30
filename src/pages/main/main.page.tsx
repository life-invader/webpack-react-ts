import img from '@images/image_1.jpg';
import imgSvg from '@images/icon-heart.svg';
import Svg from '@icons/icon-home.svg';

const MainPage = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <img src={img} alt="" width={200} height={150} />
      <img src={imgSvg} alt="" width={200} height={150} />
      <Svg className="icon" width={200} height={200} />
    </div>
  );
};

export default MainPage;
