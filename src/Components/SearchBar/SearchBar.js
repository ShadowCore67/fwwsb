import React from 'react'
import './SearchBar.css'
import Form from 'react-bootstrap/Form';

const SearchBar = (props) => {
  return (
    <div className='info-bar'>
        <Form.Select hidden={!props.unitFilter} className='faction-filter' onChange={(e) => props.filterFaction(e.target.value)}>
            <option value=''>Faction Filter</option>
            <option value='Brotherhood of Steel'>Brotherhood of Steel</option>
            <option value="Caesar's Legion">Caesar's Legion</option>
            <option value='Children of Atom'>Children of Atom</option>
            <option value='Creatures'>Creatures</option>
            <option value='Enclave'>Enclave</option>
            <option value='Gunners'>Gunners</option>
            <option value='Institue'>Institute</option>
            <option value='NCR'>NCR</option>
            <option value='Raiders'>Raiders</option>
            <option value='Railroad'>Railroad</option>
            <option value='Robots'>Robots</option>
            <option value='Super Mutants'>Super Mutants</option>
            <option value='Survivors'>Survivors</option>
        </Form.Select>
        <Form.Select hidden={props.unitFilter} className='faction-filter' onChange={(e) => props.filterCategory(e.target.value)}>
            <option value=''>Item Filter</option>
            <option value='rifle'>Rifles</option>
            <option value='pistol'>Pistols</option>
            <option value='heavy'>Heavy</option>
            <option value='melee'>Melee</option>
            <option value='thrown'>Thrown</option>
            <option value='armor'>Armor</option>
            <option value='power armor'>Power Armor</option>
            <option value='clothing'>Clothing</option>
            <option value='rifle mod'>Rifle Mods</option>
            <option value='pistol mod'>Pistol Mods</option>
            <option value='heavy mod'>Heavy Mods</option>
            <option value='melee mod'>Melee Mods</option>
            <option value='armor mod'>Armor Mods</option>
            <option value='power armor mod'>Power Armor Mods</option>
            <option value='clothing mod'>Clothing Mods</option>
            <option value='chem'>Chems</option>
            <option value='food'>Food</option>
            <option value='alcohol'>Alcohol</option>
            <option value='gear'>Gear</option>
            <option value='perk'>Perks</option>
        </Form.Select>
        <Form.Control className='search' type='text' placeholder='Search...' onKeyUp={(e) => props.search(e.target.value)}/>
      </div>
  )
}

export default SearchBar