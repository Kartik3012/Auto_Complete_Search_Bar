import React, { useState } from 'react';
import { STATES_LIST, IMG_URL } from './utils/constants';
import './ChipInput.css';

const ChipInput = () => {
    const [lastSelectedChip, setLastSelectedChip] = useState(null);
    const [inputText, setInputText] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState(STATES_LIST);
    const [optionsList, setOptionsList] = useState(STATES_LIST);

    // *** To add a chip after selecting from list
    const addChip = (e, chip) => {
        const presentChips = selectedChips.map(c => c.stateName);
        setSelectedChips([...selectedChips, chip]);
        setFilteredOptions(optionsList.filter((item) => {
            return item.stateName !== chip.stateName && !presentChips.includes(item.stateName);
        }));
        setInputText("");
    }

    // *** To remove a chip after selecting from list
    const removeChip = (chip) => {
        setFilteredOptions([...filteredOptions, chip]);
        setSelectedChips(selectedChips.filter((item) => {
            return item.stateName !== chip.stateName;
        }));
    }

    // *** To filter search list based on user input
    const handleOnInputChange = (e) => {
        const availableOptions = optionsList.filter((option) => {
            return !selectedChips.includes(option);
        })
        setInputText(e.target.value);
        setFilteredOptions(availableOptions.filter((item) => {
            return item.stateName.toLowerCase().includes(e.target.value.toLowerCase());
        }));
    }

    // *** To handle backspace key press for deleting last chip
    const handleBackspacePress = (e) => {
        if (e.key === "Backspace") {
            if (inputText === "" && lastSelectedChip === null && selectedChips.length > 0) {
                const lastChip = selectedChips[selectedChips.length - 1];
                setLastSelectedChip(lastChip);
                const lastChipElem = document.getElementById(`chip-${lastChip.id}`);
                lastChipElem.classList.add('highlight');
            }
            else if (lastSelectedChip !== null) {
                removeChip(lastSelectedChip);
                setLastSelectedChip(null);
            }
        }
        else if (lastSelectedChip !== null) {

            const lastChipElem = document.getElementById(`chip-${lastSelectedChip.id}`);
            lastChipElem.classList.remove('highlight');
            setLastSelectedChip(null);
        }
    }

    return (
        <>
            <div className="chips-container">
                {selectedChips.map((chip) => {
                    return < span className="chips" key={"chip-" + chip.id} id={"chip-" + chip.id} >
                        <span><img src={IMG_URL} alt="img" /></span>
                        {chip.stateName}
                        < span className="remove-button" key={chip.id} id={chip.id}
                            onClick={() => removeChip(chip)}
                        >&times;
                        </span >
                    </span >
                })
                }
                <span >
                    <input id="input-field" type="text" className="chips-input" placeholder='Search State' value={inputText} onKeyDown={(e) => handleBackspacePress(e)} onChange={(e) => handleOnInputChange(e)} />
                </span>
            </div >

            <div className="options">
                {filteredOptions.map((option) => {
                    return <div className="option" key={"option-" + option.id} id={"option-" + option.id}
                        onClick={(e) => addChip(e, option)}>
                        <span><img src={IMG_URL} alt="img" /></span>{option.stateName}&nbsp;
                        <span className="capital-name">{option.capital}</span>
                    </div>
                })}
            </div >
        </>
    );
};

export default ChipInput;
