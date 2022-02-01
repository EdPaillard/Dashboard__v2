import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import "../styles/Widget.css";

export default function Widget({widget, removeWidgets}) {
    console.log(widget.temperature);

    const temperature = "Température: " + widget.temperature + "°C";
    const humidity = "Humidité dans l'air: " + widget.humidity + "%";
    const wind = "Vitesse du vent: " + widget.wind + " m/s";

    const handleClose = () => {
        removeWidgets(widget.value);
    }

    return widget.value !== null ? (
        <div key={widget.value}>
            <Col md="auto">
            <Card className='widgetStyle'>
                <Card.Body>
                    <CloseButton onClick={handleClose} className='closeButton' />
                    <Card.Title>{widget.value}</Card.Title>
                    {widget.temperature != null ? (<Card.Subtitle className='mb-2 text-muted'>{temperature}</Card.Subtitle>) : null}
                    <Card.Subtitle className='mb-2 text-muted'>{widget.albumName}{widget.channelTitle}</Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>{widget.videoTitle}</Card.Subtitle>
                    {widget.humidity != null ? (<Card.Subtitle className='mb-2 text-muted'>{humidity}<br/>{wind}</Card.Subtitle>) : null}
                    {widget.source != null ?(<Card.Subtitle><span>{widget.source}</span><span>{widget.publishedAt}</span><span>{widget.author}</span></Card.Subtitle>) : null }
                    {widget.artistName != null ?(<Card.Subtitle><span>{widget.artistName}</span><span>{widget.songTitle}</span></Card.Subtitle>) : null }
                    {widget.coverAlbum != null ? (<Card.Img variant='top' src={widget.coverAlbum} alt={widget.value}></Card.Img>) : null }
                    {widget.miniature != null ? (<Card.Img variant='top' src={widget.miniature} alt={widget.value}></Card.Img>) : null }
                    {widget.songLink != null ? (<audio controls src={widget.songLink}></audio>) : null}
                    <Card.Text>{widget.description}{widget.resume}{widget.videoDescription}</Card.Text>
                    {widget.url != null ? (<Card.Text><span>Intégralité de l'article : <a href={widget.url}>ici</a></span></Card.Text>) : null}
                </Card.Body>
            </Card>
            </Col>
        </div>
    ) : null;   
    
}

// const [widgets, setWidgets] = useState([{
//     value: null,
//     temperature: null,
//     description: null,
//     humidity: null,
//     wind: null,
//     coverAlbum: null,
//     albumName: null,
//     songLink: null,
//     artistName: null,
//     songTitle: null,
//     title: null,
//     source: null,
//     author: null,
//     resume: null,
//     url: null,
//     publishedAt: null,
//     channelTitle: null,
//     videoTitle: null,
//     miniature: null,
//     videoDescription: null
// }])