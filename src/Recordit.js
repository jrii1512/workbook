import React, {useEffect, useState} from 'react'


export function Records(props){
const { rekisteri } = props
console.log(rekisteri)

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

        {rekisteri &&
          rekisteri.map((r) => (
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