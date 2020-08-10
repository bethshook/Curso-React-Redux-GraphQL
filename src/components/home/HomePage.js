import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
// gives us dispatch and getState
import { connect } from 'react-redux'
// this is the remove char action, will be used as a prop
import { removeCharacterAction, addToFavoritesAction } from "../../redux/charsDuck"

// let URL = "https://rickandmortyapi.com/api"

function Home({chars, removeCharacterAction, addToFavoritesAction }) {

    // let [chars, setChars] = useState([])

    // useEffect(() => {
    //     getCharacters()
    // }, [])

    // function nextChar() {
    //     chars.shift()
    //     if (!chars.length) {
    //         //get more characters
    //     }
    //     setChars([...chars])
    // }

  function addFav() {
    addToFavoritesAction()
  }

    function renderCharacter() {
        let char = chars[0]
        return (
            <Card rightClick={addFav} leftClick={nextCharacter} {...char} />
        )
    }

    // calls the action, not really necessary to create this func
    // could pass action directly to card
    function nextCharacter(){
        removeCharacterAction()
    }

    // function getCharacters() {
    //     return axios.get(`${URL}/character`)
    //         .then(res => {
    //             setChars(res.data.results)
    //         })
    // }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

// take redux state and put it in the props of this component
function mapStateToProps(store){
    return {
        chars:store.characters.array
    }
}

// connect with redux
// second param is removeChar, within an object; it will be used in props
export default connect(mapStateToProps, {removeCharacterAction, addToFavoritesAction})(Home)
