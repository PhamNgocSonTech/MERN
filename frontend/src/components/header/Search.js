import React, {useState} from 'react'

const Search = () => {
    const [search, setSearch] = useState('')
    return (
    <form className="search-form">
        <input type="text" name = "search" value={search} id = "search"
        onChange={e=>setSearch(e.target.value.toLowerCase().replace(/ /g,''))}/>

        <div className='search-icon'>
            <span className='material-icons'>search</span>
            <span>Search</span>
        </div>

        <div className='close-search'>&times;</div>
    </form>

  )
}

export default Search