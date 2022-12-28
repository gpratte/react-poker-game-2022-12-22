import {Accordion, Button, Form} from "react-bootstrap";
import '../../common/style/common.css'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useRef, useState} from "react";
import Container from "react-bootstrap/Container";
import useEditPlayer from "../hooks/useEditPlayer";
function EditPlayer(props) {

  const [open, setOpen] = useState(false);
  const [accordionBodyKey, setAccordionBodyKey] = useState(Math.random());

  const [buyInChecked, setBuyInChecked] = useState(!!props.gamePlayer.boughtIn);
  const [rebuyChecked, setrebuyChecked] = useState(!!props.gamePlayer.rebought);
  const [annualTocChecked, setAnnualTocChecked] = useState(!!props.gamePlayer.annualTocParticipant);
  const [qTocChecked, setQTocChecked] = useState(!!props.gamePlayer.quarterlyTocParticipant);
  const [alertChecked, setAlertChecked] = useState(!!props.gamePlayer.roundUpdates);
  const [place, setPlace] = useState(props.gamePlayer.place);
  const [chop, setChop] = useState(props.gamePlayer.chop);

  const accordionRef = useRef(null);
  const {deleteGamePlayer, updateGamePlayer} = useEditPlayer();

  const renderPlaces = (gamePlayer, gamePlayers) => {
    // Build an array of the places taken
    const taken = [];
    for (const gp of gamePlayers) {
      if (gp.id === gamePlayer.id) {
        continue;
      }
      if (gp.place && gp.place < 11) {
        taken.push(gp.place);
      }
    }

    const numPlaces = Math.min(gamePlayers.length, 10);
    let placesLeft = [];
    for (let i = 1; i <= numPlaces; i++) {
      if (!taken.includes(i)) {
        placesLeft.push(i);
      }
    }

    return placesLeft.map((place) => {
      const selected = gamePlayer.place === place;
      return (
        <option key={place} value={place} selected={selected}>{place}</option>
      )
    })
  }

  return (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Button ref={accordionRef} onClick={() => {
          const wasOpen = open;
          setOpen(!open);
          if (wasOpen) {
            // Reset state to original in case the user cancelled
            setBuyInChecked(!!props.gamePlayer.boughtIn);
            setrebuyChecked(!!props.gamePlayer.rebought);
            setAnnualTocChecked(!!props.gamePlayer.annualTocParticipant);
            setQTocChecked(!!props.gamePlayer.quarterlyTocParticipant);
            setAlertChecked(!!props.gamePlayer.roundUpdates);
            setPlace(props.gamePlayer.place);
            setChop(props.gamePlayer.chop);

            // Change the key and the body component will refresh
            setAccordionBodyKey(Math.random())
          }
        }}>
          {props.gamePlayer.roundUpdates ? <i className="fa-solid fa-bell"></i> : ''} {props.gamePlayer.name}
        </Accordion.Button>
        <Accordion.Body key={accordionBodyKey}>
          <Form>
            <Form.Control type={'hidden'} id={'gamePlayerId'} value={props.gamePlayer.id}/>
            <Form.Group style={{margin: "10px"}}>
              <Form.Check inline
                          onClick={() => setBuyInChecked(!buyInChecked)}
                          type={'checkbox'}
                          id={'buyInId'}
                          label={'Buy-In'}
                          defaultChecked={buyInChecked}
              />
              <Form.Check inline
                          onClick={() => setrebuyChecked(!rebuyChecked)}
                          type={'checkbox'}
                          id={'rebuyId'}
                          label={'Rebuy'}
                          defaultChecked={rebuyChecked}
              />
            </Form.Group>
            <Form.Group style={{margin: "10px"}}>
              <Form.Check inline
                          onClick={() => setAnnualTocChecked(!annualTocChecked)}
                          type={'checkbox'}
                          id={'tocId'}
                          label={'Annual TOC'}
                          defaultChecked={annualTocChecked}
              />
              <Form.Check inline
                          onClick={() => setQTocChecked(!qTocChecked)}
                          type={'checkbox'}
                          id={'qtocId'}
                          label={String.fromCharCode(188) + ' TOC'}
                          defaultChecked={qTocChecked}
              />
            </Form.Group>
            <Form.Group style={{margin: "10px"}}>
              <Form.Check inline
                          onClick={() => setAlertChecked(!alertChecked)}
                          type={'checkbox'}
                          id={'clockAlertId'}
                          label={'Clock Alert'}
                          defaultChecked={alertChecked}
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>&nbsp;&nbsp;Place</Form.Label>
              <Col>
                <Form.Control style={{textAlign: "center"}}
                              onChange={(e) => setPlace(e.target.value)}
                              as="select"
                              id="placeId">
                  <option key={11} value={11}>---</option>
                  {open && renderPlaces(props.gamePlayer, props.gamePlayers)}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>&nbsp;&nbsp;Chop</Form.Label>
              <Col>
                <Form.Control style={{textAlign: "center"}}
                              onChange={(e) => setChop(e.target.value)}
                              as="input"
                              defaultValue={chop}
                              placeholder={"Chop amount"}
                              id="chopId"/>
              </Col>
            </Form.Group>
            <Container style={{marginTop: "20px"}}>
              <Row>
                <Col>
                  <Button variant="danger" onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    const doit = confirm('are you sure?');
                    if (doit) {
                      accordionRef.current.click();
                      deleteGamePlayer(props.gamePlayer.id);
                    }
                  }}>
                    Delete
                  </Button>
                </Col>
                <Col>
                  <Button variant="secondary" onClick={() => {
                    accordionRef.current.click();
                  }}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button variant="primary" onClick={() => {
                    updateGamePlayer({
                      buyin: buyInChecked,
                      rebuy: rebuyChecked,
                      annual: annualTocChecked,
                      quarterly: qTocChecked,
                      alert: alertChecked,
                      place: place,
                      chop: chop});
                    // must come after getting the state because the click will reset the state
                    accordionRef.current.click();
                  }}>
                    Update
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default EditPlayer;