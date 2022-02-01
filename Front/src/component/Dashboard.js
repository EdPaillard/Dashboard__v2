import { useState, useRef, useEffect } from "react"
import ServicesList from "./ServicesList";
import WidgetsList from "./WidgetsList";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../styles/Dashboard.css';

const LOCAL_STORAGE_KEY = 'servicesApp.services'

const Dashboard = () => {

    const range = 5;

    const options = [
        {
            label: "-- Choisissez votre service --",
            value: ""
        },
        {
            label: "Météo",
            value: "weather"
        },
        {
            label: "News",
            value: "news"
        },
        {
            label: "Deezer",
            value: "deezer"
        },
        {
            label: "Youtube",
            value: "youtube"
        }
    ]

    const [services, setServices] = useState([{
        value: null,
        title: null,
        label: null,
        labelFor: null,
        onSubmit: null,
        //onChange: handleWidgets,
        inputName: null,
        installed: false
    }])

    const [widgets, setWidgets] = useState([{
        value: null,
        temperature: null,
        description: null,
        humidity: null,
        wind: null,
        coverAlbum: null,
        albumName: null,
        songLink: null,
        artistName: null,
        songTitle: null,
        title: null,
        source: null,
        author: null,
        resume: null,
        url: null,
        publishedAt: null,
        channelTitle: null,
        videoTitle: null,
        miniature: null,
        videoDescription: null
    }])
    console.log(widgets);

    useEffect(() => {
        const storedServices = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(storedServices) {
            setServices(storedServices)
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8082/widgets");
            const data = await response.json();
            console.log(data);
            let urlArray = [];
            for(let i = 0; i < data.length; i++) {
                urlArray.push(data[i].url);
            }
            urlArray.map(async (urlelmt) => {
                const response = await fetch(urlelmt);
                const data = await response.json();

                if(data["main"] !== undefined) {
                    setWidgets(prevWidgets => {
                        return [...prevWidgets, {value: data["name"], temperature: Math.floor((data["main"]["temp"] - 273.15)), description: data["weather"][0]["main"], humidity: data["main"]["humidity"], wind: data["wind"]["speed"] }]
                    });
                } else if(data["data"] !== undefined) {
                    setWidgets(prevWidgets => {
                        return [...prevWidgets, {value: data["data"][0]["title"], coverAlbum: data["data"][0]["album"]["cover"], albumName: data["data"][0]["album"]["title"], songLink: data["data"][0]["preview"], artistName: data["data"][0]["artist"]["name"], songTitle: data["data"][0]["title"] }]
                    });
                } else if(data["articles"] !== undefined){
                    data["articles"].map(article => {
                        return setWidgets(prevWidgets => {
                            return [...prevWidgets, {value: article["title"], title: article["title"], source: article["source"]["name"], author: article["author"], resume: article["description"], url: article["url"], publishedAt: article["publishedAt"] }]
                        });
                    })
                }
            })
        }
        fetchData();
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(services))
    }, [services])

    const serviceNameRef = useRef()

    const handleAddService = () => {
        const name = serviceNameRef.current.value;
        const arrayServices = Object.values(services);
        if (name === '') {
            return;
        }
        for (let i = 0; i < arrayServices.length; i++) {
            if (arrayServices[i].value === name ) {
                return;
            }
        }
            
        switch(name) {
            case "weather":
                setServices(prevServices => {
                    return [...prevServices, {value: name, title: "Météo", label: "Choisissez une ville", labelFor: "city", onSubmit: getJSON, inputName: "city", installed: true }]
                })
                break;
            case "deezer":
                setServices(prevServices => {
                    return [...prevServices, {value: name, title: "Deezer", label: "Choisissez une chanson", labelFor: "song", onSubmit: getJSON, inputName: "song", installed: true }]
                })
                break;
            case "news":
                setServices(prevServices => {
                    return [...prevServices, {value: name, title: "Actualités", label: "Choisissez une actualité", labelFor: "news", onSubmit: getJSON, inputName: "news", installed: true }, {value: name, title: "Domaines", label: "Choisissez un domaine d'actualités", labelFor: "domain", onSubmit: getJSON, inputName: "domain", installed: true }]
                })
                break;
            case "youtube":
                setServices(prevServices => {
                    return [...prevServices, {value: name, title: "Youtube", label: "Choisissez un youtubeur", labelFor: "youtube", onSubmit: getJSON, inputName: "youtube", installed: true }]
                })
                break;
            default:
                return;
        }
    }

    const removeWidgets = (widgetValue) => {
        const wiValue = widgetValue;
        function filterWidgets(obj) {
            if(obj.value !== wiValue) {
                return true;
            }
        }
        const newWidgets = widgets.filter(filterWidgets);
        setWidgets(newWidgets);

        async function fetchDeleteWidgets() {
            console.log(wiValue);
            const response = await fetch("http://localhost:8082/delWidgets", {
                method: "POST",
                headers: { "Content-Type": 'application/json' },
                mode: 'cors',
                body: JSON.stringify(wiValue)
            });
            // const response = await fetch("http://localhost:8082/delWidgets?value=" + wiValue, {
            //     method: "POST",
            //     mode: 'cors',
            // });
            const data = await response.json();
            console.log(data);
        }
        fetchDeleteWidgets()
    }

    const handleRemoveService = () => {
        const name = serviceNameRef.current.value;
        if (name === '') return;
        function filterRemove(obj) {
            if(obj.value !== name) {
                return true;
            }
        }
        const newServices = services.filter(filterRemove);
        setServices(newServices);
        
        //services.filter(service => !service.installed).length 
        
    }

    const getJSON = (e, select, value ) => { 
        e.preventDefault();
        switch(select){
            case "weather":
                const getWeather = async (arg) => {
                    const value = arg;
                    const response = await fetch('http://localhost:8082/services/weather/temp?value=' + value);
                    const data = await response.json();
                    console.log(data);
                    setWidgets(prevWidgets => {
                        return [...prevWidgets, {value: data["name"], temperature: Math.floor((data["main"]["temp"] - 273.15)), description: data["weather"][0]["main"], humidity: data["main"]["humidity"], wind: data["wind"]["speed"] }]
                    });
                    console.log(widgets);
                }
                getWeather(value);
            break;
            case "deezer":
                const getDeezer = async (arg) => {
                    const value = arg;
                    const response = await fetch('http://localhost:8082/services/music/artist?value=' + value);
                    const data = await response.json();
                    const coverAlbum = data["data"][0]["album"]["cover"];
                    const albumName = data["data"][0]["album"]["title"];
                    const songLink = data["data"][0]["preview"];
                    const artistName = data["data"][0]["artist"]["name"];
                    const songTitle = data["data"][0]["title"];
                    const deezerData = [coverAlbum, albumName, songLink, artistName, songTitle]
                    console.log(deezerData);
                    setWidgets(prevWidgets => {
                        return [...prevWidgets, {value: value, coverAlbum: coverAlbum, albumName: albumName, songLink: songLink, artistName: artistName, songTitle: songTitle }]
                    });
                    console.log(widgets);
                }
                getDeezer(value);
            break;
            case "news":
                const getNews = async (arg) => {
                    const value = arg;
                    const response = await fetch('http://localhost:8082/services/news/keyword?value=' + value);
                    const newsData = await response.json();
                    console.log(newsData);
                    for(let i = 0; i < range; i++) {
                        setWidgets(prevWidgets => {
                            return [...prevWidgets, {value: newsData["articles"][i].title, title: newsData["articles"][i].title, source: newsData["articles"][i].source.name, author:newsData["articles"][i].author, resume: newsData["articles"][i].description, url: newsData["articles"][i].url, publishedAt: newsData["articles"][i].publishedAt }]
                        });
                    }
                    // newsData["articles"].map(article => {
                    //     return setWidgets(prevWidgets => {
                    //         return [...prevWidgets, {value: value, title: article["title"], source: article["source"]["name"], author: article["author"], resume: article["description"], url: article["url"], publishedAt: article["publishedAt"] }]
                    //     });
                    // })
                    console.log(widgets);
                    
                }
            
                // const getDomain = async (arg) => {
                //     const value = arg;
                //     const response = await fetch('http://localhost:8082/services/news/topnews?value=' + value);
                //     const domainData = await response.json();
                //     console.log(domainData);
                // }
                getNews(value);
                // getDomain(value);
            break;
            case "youtube":
                const getYoutube = async (arg) => {
                    const value = arg;
                    const response = await fetch('http://localhost:8082/services/yt/search?value=' + value);
                    const youtubeData = await response.json();
                    console.log(youtubeData);
                    youtubeData["items"].map(item => {
                        return setWidgets(prevWidgets => {
                            return [...prevWidgets, {value: value, channelTitle: item["snippet"]["channelTitle"], videoTitle: item["snippet"]["title"], miniature: item["snippet"]["thumbnails"]["medium"]["url"], videoDescription: item["snippet"]["description"] }]
                        });
                    })
                    console.log(widgets);
                }
                getYoutube(value);
            break;
            default:
                return;
        }
    }
    
    return (<div>
        <Container className="servicesSelect">
            <h1>Souscrivez à vos services</h1>
            <Form>
                <Form.Select ref={serviceNameRef} id='servicesSelect' name="services">
                    {options.map((option) => 
                        <option key={option.label} value={option.value}>{option.label}</option>
                        )}    
                </Form.Select><br/>
                    <Button onClick={handleAddService} id='servicesAdd' type="button" className="btn btn-success addServButton" >Ajouter</Button>
                    <Button onClick={handleRemoveService} id='servicesRemove' type="button" className="btn btn-danger">Supprimer</Button>
            </Form>
        </Container>
        <Container>
            <ServicesList widgets={widgets} getJSON={getJSON} services={services}/>
        </Container>
        <Container>
            <WidgetsList removeWidgets={removeWidgets} widgets={widgets} />
        </Container>
            </div>)
}

export default Dashboard