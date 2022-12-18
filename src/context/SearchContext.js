import React, { useContext, useState } from "react"
import axios from "axios"

const SearchContext = React.createContext()

export const useSearch = () => {
    return useContext(SearchContext)
}

export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState('')
    const [allCompanies, setAllCompanies] = useState([])
    const filteredCompanies = allCompanies.filter(company => company.companyName.toLowerCase().includes(search.toLowerCase())) 
   
    const handleGetAllPartners = async (companySearch) => {
        await axios.get(`https://syndicatedserver-371000.uc.r.appspot.com/getAllPartners`)
        .then(res => setAllCompanies(res.data)) 
        .then(setSearch(companySearch))    
    }

    return (
        <SearchContext.Provider
            value={{
                filteredCompanies,
                handleGetAllPartners
            }}
        >
            {children}
        </SearchContext.Provider>
    )

}
