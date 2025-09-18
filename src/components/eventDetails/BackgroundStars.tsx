import Cicle from './Cicle';
import Star from './Star';

const BackgroundStars = () => {
  return (
    <div className="absolute inset-0 -bottom-44 overflow-hidden">
      <Star top="686" left="241" />
      <Star top="808" left="828" />
      <Star top="1425" left="408" />
      <Star top="1443" left="808" />
      <Star top="1773" left="506" />
      <Star top="2215" left="927" />
      <Star top="2419" left="814" />
      <Star top="2415" left="1258" />
      <Star top="2724" left="336" />
      <Star top="3442" left="937" />
      <Star top="3859" left="32" />

      <Cicle top="1168" left="777" />
      <Cicle top="1234" left="261" />
      <Cicle top="1639" left="349" />
      <Cicle top="2465" left="342" />
      <Cicle top="2824" left="1042" />
      <Cicle top="3505" left="1038" />
      <Cicle top="3850" left="1028" />

      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(155, 143, 243, 0.80)" />
            <stop offset="100%" stopColor="rgba(56, 246, 249, 0.80)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BackgroundStars;
