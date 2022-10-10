import CarDetection from '../images/self-driving-cars.jpg';
import ResNets from '../images/resNets.png';
import TextSummarisation from '../images/text-Summarization.jpg';
import FaceEmotionDetection from '../images/face-emotion-detection.png';
import Tensorflow from '../images/tensorflow.png';
import Covid from '../images/covid.png';
import Wall from '../images/bgImage.jpg';
import Drum from '../images/JSThirty/drum.png';
import Clock from '../images/JSThirty/clock.png';
import CitySearch from '../images/JSThirty/CitySearch.png';
import microfrontend from '../images/react/microfrontend.png';
import TicTacToe from '../images/games/tic-tac-toe.png';

const comingSoon = {
    projectTitle: 'Coming soon ...',
    projectIntro: 'New project',
    skills: [],
    img: Wall,
    link: "",
    gitHub: "",
}


// TODO - move this to a BE server
export const projectsCardCNN = [
    {
        projectTitle: 'Autonomous driving - YOLO model',
        projectIntro: 'Autonomous driving and object detection using the very powerful YOLO model',
        skills: ['YOLO model', 'Python'],
        img: CarDetection,
        link: "/autonomous-driving",
        gitHub: "https://github.com/fwbrandao/Deep_Learning/blob/master/Convolutional_Neural_Networks/Week_3/Autonomous_driving_application_Car_detection.ipynb",
    },
    {
        projectTitle: 'Abstractive Summarisation',
        projectIntro: 'Facebook Bart CNN Model for Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension',
        skills: ['Python', 'Transformers'],
        img: TextSummarisation,
        link: "/abstractive-summarisation",
        gitHub: "https://github.com/fwbrandao/Abstractive_Summarisation/blob/main/Bart-CNN%20Abstractive%20Summarisation.ipynb",
    },
    {
        projectTitle: 'Residual Networks - ResNets',
        projectIntro: 'Use ResNets to build very deep CNNs',
        skills: ['Keras', 'Python', 'TensorFlow'],
        img: ResNets,
        link: "/residual-networks",
        gitHub: "https://github.com/fwbrandao/Deep_Learning/blob/master/Convolutional_Neural_Networks/Week_2/Residual_Networks_v2.ipynb"
    },
    {
        projectTitle: 'ConvNet & TensorFlow application',
        projectIntro: 'Build and train a ConvNet in TensorFlow for a classification problem',
        skills: ['Python', 'TensorFlow'],
        img: Tensorflow,
        link: "/convnet-tensorflow",
        gitHub: "https://github.com/fwbrandao/Deep_Learning/blob/master/Convolutional_Neural_Networks/Week_1/Convolution_model_Application_v1a.ipynb",
    },
    {
        projectTitle: 'Keras introduction',
        projectIntro: 'Emotion Detection in images of faces',
        skills: ['Keras', 'Python', 'TensorFlow'],
        img: FaceEmotionDetection,
        link: "/keras-introduction",
        gitHub: "https://github.com/fwbrandao/Deep_Learning/blob/master/Convolutional_Neural_Networks/Week_2/Keras_Tutorial_v2.ipynb"
    },
    comingSoon
];

export const projectsCardANN = [
    comingSoon
];

export const projectsCardDEP = [
    {
        projectTitle: 'Covid-19 disease exploration, visualization and prediction',
        projectIntro: 'Exploratory session on a corona virus(Covid-19 disease) dataset.',
        skills: ['Panda', 'Numpy', 'Python'],
        img: Covid,
        link: "/covid",
        gitHub: "https://github.com/fwbrandao/Covid-19_disease_analysis/blob/master/.ipynb_checkpoints/covid-19_visualization_prediction-checkpoint.ipynb",
    },
    comingSoon
];

export const projectsCardSM = [
    comingSoon
];

export const projectsCardML = [
    comingSoon
];

export const projectCardJS30 = [
    {
        projectTitle: 'City search',
        projectIntro: 'Search for cities and its population.',
        skills: ['DOM', 'Interface'],
        img: CitySearch,
        link: "/js30",
        gitHub: "https://github.com/fwbrandao/JavaScript-City-Searcher",
    },
    {
        projectTitle: 'Drum kit',
        projectIntro: 'Interactive drum kit build with JavaScript',
        skills: ['DOM & INTERFACE', 'CSS', 'AUDIO + VIDEO'],
        img: Drum,
        link: "/js30",
        gitHub: "https://github.com/fwbrandao/JavaScript-Drum-Kit",
    },
    {
        projectTitle: 'CSS + JS Clock',
        projectIntro: 'JavaScrip cool clock.',
        skills: ['FUNDAMENTALS', 'CSS', 'useRef'],
        img: Clock,
        link: "/js30",
        gitHub: "https://github.com/fwbrandao/JavaScript-clock",
    },
    comingSoon
]

export const react = [
    {
        projectTitle: 'Microfrontend App',
        projectIntro: 'Scalable app with microfrontend architecture and module federation. The app has webpack configuration with a full CI/CD pipeline. Its also deployed on Amazon Web Services using CloudFront.',
        skills: ['Microfrontend', 'Webpack', 'AWS CloudFront'],
        img: microfrontend,
        link: "",
        gitHub: "https://github.com/fwbrandao/Microfrontend",
        externalURL: "https://d39m468i9aqsvj.cloudfront.net",
    },
    comingSoon
]

export const games = [
    {
        projectTitle: 'Tic Tac Toe Game',
        projectIntro: 'Tic tac toe game built with react and typeScrypt.',
        skills: ['React', 'TypeScrypt'],
        img: TicTacToe,
        link: "/tic-tac-toe",
        gitHub: "https://github.com/fwbrandao/Tic-Tac-Toe",
    },
    comingSoon
]