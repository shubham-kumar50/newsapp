import React, {useEffect, useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanImage from './images/alan.png';
import useStyles from './styles.js';

//const alanKey = '5e1a5784bdb4aab4fbf5186cc70b744e2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setnewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: '5e1a5784bdb4aab4fbf5186cc70b744e2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, articles, number, article, savedArticles}) => {
                if(command === 'newHeadlines'){
                    setnewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if (command === 'highlight') {
                    //for(let start = 0;start<savedArticles.length;start++){
                        setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                        //alanBtn().playText(`${savedArticles[start].title}`);
                    //}
                }
                else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > articles.length) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                }
            },
        });
    },[]);

    return (
        <div>
            <div className={classes.logoContainer}>
                {newsArticles.length ? (
                <div className={classes.infoContainer}>
                    <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                    <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                </div>
                ) : null}
                <img src={alanImage} className={classes.alanLogo} alt="alan logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;