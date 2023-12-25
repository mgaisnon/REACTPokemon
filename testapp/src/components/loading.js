import Loading from 'react-loading'
import pikachu from '../media/pikachu-running.gif'
function loading(){
    return(
        <div>
           <Loading type={'spinningBubbles'}  height={50} width={50}/>
        </div>
    )
}

export default loading