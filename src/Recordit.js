import React, {useEffect, useState} from 'react'


export function Records(props){
const { tuntilista } = props
console.log("tuntilista: ", tuntilista)
const {rekisteri} = tuntilista
console.log("Records:")

    return(
        <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Pvm</th>
            <th>Poikkeama tunnit</th>
            <th>Saldot</th>
            <th>Selite</th>
          </tr>
        </thead>

        {
          tuntilista && tuntilista.map((r) => (
            <tbody>
              <tr>
                <td>{r.id}</td>
                <td>{r.pvm}</td>
                <td>{r.poikkeama}</td>
                <td>{r.saldo}</td>
                <td>{r.selite}</td>
              </tr>
            </tbody>
          ))}
      </table>
    )
}