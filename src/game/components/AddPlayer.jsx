import {Button, Form, Modal, Tab, Tabs} from "react-bootstrap";
import {useContext, useState} from "react";
import _ from "lodash";
import leaguePlayersData from "../../clients/league-players-data";
import seasonData from "../../clients/season-data";
import {GameContext} from "./Game";

function AddPlayer(props) {

  const {game} = useContext(GameContext);

  const gamePlayers = game.players;
  const players = leaguePlayersData;
  const seasonPlayers = seasonData.players;

  // Sort season players by name
  seasonPlayers.sort((sp1, sp2) => sp1.name.localeCompare(sp2.name));

  const [tab, setTab] = useState('league-player');

  const addPlayer = (e) => {
    console.log('call game client to add a player')
    e.preventDefault();
  }

  const renderPlayers = (players, seasonPlayers, gamePlayers) => {
    // Remove players already in game
    const playersFiltered = _.filter(players,
      (p) => {
        let index = _.findIndex(gamePlayers, function(gp) {
          return gp.playerId === p.id;
        });
        // return true if not found (i.e. the player is not
        // filtered out of the players to choose from
        return index === -1;
      }
    );

    let seasonPlayersFiltered;
    if (seasonPlayers) {
      // Remove season players already in game
      seasonPlayersFiltered = _.filter(seasonPlayers,
        (sp) => {
          let index = _.findIndex(gamePlayers, function(gp) {
            return gp.playerId === sp.playerId;
          });
          // return true if not found (i.e. the player is not
          // filtered out of the players to choose from
          return index === -1;
        }
      );
    } else {
      seasonPlayersFiltered = [];
    }

    // Remove players in that are in the season
    const playersFiltered2 = _.filter(playersFiltered,
      (p) => {
        let index = _.findIndex(seasonPlayersFiltered, function(sp) {
          return sp.playerId === p.id;
        });
        // return true if not found (i.e. the player is not
        // filtered out of the players to choose from
        return index === -1;
      }
    );

    // Separator
    if (seasonPlayersFiltered && seasonPlayersFiltered.length > 0) {
      seasonPlayersFiltered.push({id: 0, name: '----------------------'})
    }

    // Combine season players followed by players
    seasonPlayersFiltered.push(...playersFiltered2);

    return seasonPlayersFiltered.map((player, index) => {
      const {
        id, playerId, firstName, lastName, name
      } = player;

      let text;
      if (!name) {
        text = firstName ? firstName : '';
        text += (firstName && lastName) ? ' ' : '';
        text += lastName ? lastName : '';
      } else {
        text = name;
      }

      let ident = playerId ? playerId : id;

      return (
        <option key={ident} value={ident}>{text}</option>
      )
    })
  }

  return (
    <div>
      <Modal show={props.showAddPlayer}
             backdrop={'static'}
             onHide={() => props.setShowAddPlayer(false)}>
        <Modal.Body>
          <Form onSubmit={addPlayer}>
            <Tabs className="style1"
                  defaultActiveKey="league-player"
                  onSelect={key => setTab(key)}
                  id="uncontrolled-tab-example">
              <Tab className="style2" eventKey="league-player" title="League Player&nbsp;&nbsp;&nbsp;&nbsp;">
                <Form.Group>
                  <Form.Control as="select" id="playerId">
                    {renderPlayers(players, seasonPlayers, gamePlayers)}
                  </Form.Control>
                </Form.Group>
              </Tab>
              <Tab className="style2" eventKey="new-player" title="&nbsp;&nbsp;&nbsp;&nbsp;New Player">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="First" id={'firstNameId'}/>
                  <Form.Control type="text" placeholder="Last" id={'lastNameId'}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" id={'emailId'}/>
                  <Form.Text className="text-muted">
                    Needed to login
                  </Form.Text>
                </Form.Group>
              </Tab>
            </Tabs>

            <Form.Check inline
                        type={'checkbox'}
                        id={'buyInId'}
                        label={'Buy-In'}
            />
            <Form.Check inline
                        type={'checkbox'}
                        id={'tocId'}
                        label={'Annual TOC'}
            />
            <Form.Check inline
                        type={'checkbox'}
                        id={'qtocId'}
                        label={'Quarterly TOC'}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={() => props.setShowAddPlayer(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Player
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddPlayer;