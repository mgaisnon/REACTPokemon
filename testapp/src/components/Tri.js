import './Tri.css';

function Tri({ onSort }){

    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        onSort(selectedOption);
      };


    return(
    <select className='tri' onChange={handleSortChange}>
        <option value="">Tri</option>
        <option value="id asc">Numero Croissant</option>
        <option value="id desc">Numero Decroissant</option>
        <option value="name.fr asc">Alphabetique Croissant</option>
        <option value="name.fr desc">Alphabetique Decroissant</option>
        <option value="weight asc">Poids Croissant</option>
        <option value="weight desc">Poids Decroissant</option>
        <option value="height asc">Taille Croissant</option>
        <option value="height desc">Taille Decroissant</option>
    </select>
    )
}

export default Tri