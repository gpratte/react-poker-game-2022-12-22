import {Button, Form, Modal, Spinner, Tab, Tabs} from "react-bootstrap";
import {useContext} from "react";
import _ from "lodash";
import {GameContext} from "./Game";
import useAddPlayer from "../hooks/useAddPlayer";

function AddPlayer() {

  const {game, showAddPlayer, setShowAddPlayer} = useContext(GameContext);
  const {
    addGamePlayer,
    leaguePlayers,
    seasonPlayers,
    activeTabKey,
    setActiveTabKey,
    isLoading
  } = useAddPlayer();
  const gamePlayers = game.players;

  // TODO should the processing of the players be moved to a context or a util file?
  const renderPlayers = (leaguePlayers, seasonPlayers, gamePlayers) => {
    // Sort season players by name
    seasonPlayers.sort((sp1, sp2) => sp1.name.localeCompare(sp2.name));

    // Remove players already in game
    const playersFiltered = _.filter(leaguePlayers,
      (p) => {
        let index = _.findIndex(gamePlayers, function (gp) {
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
          let index = _.findIndex(gamePlayers, function (gp) {
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
        let index = _.findIndex(seasonPlayersFiltered, function (sp) {
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
      <Modal show={showAddPlayer}
             backdrop={'static'}
             onHide={() => setShowAddPlayer(false)}>
        <Modal.Body>
          <Form onSubmit={addGamePlayer}>
            <Tabs className="style1"
                  defaultActiveKey={activeTabKey}
                  onSelect={key => setActiveTabKey(key)}
                  id="uncontrolled-tab-example">
              <Tab className="style2" eventKey="league-player" title="League Player&nbsp;&nbsp;&nbsp;&nbsp;">
                <Form.Group>
                  <Form.Control as="select" id="playerId">
                    {renderPlayers(leaguePlayers, seasonPlayers, gamePlayers)}
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
                  <Form.Control type="email" placeholder="Needed to login" id={'emailId'}/>
                  <Form.Text className="text-muted">
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
              <Button variant="secondary" onClick={() => setShowAddPlayer(false)}>
                Cancel
              </Button>
              <Button variant="primary" disabled={isLoading} type="submit">
                {isLoading &&
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                }
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