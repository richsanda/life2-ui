import React from 'react'

import { Mention, MentionsInput } from 'react-mentions'

import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'

const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/

function CommentaryBox({ value, data, onChange, onAdd }) {
  return (
    <div>

      <MentionsInput
        value={value}
        onChange={onChange}
        style={defaultStyle}
        placeholder={"Mention people using '@'"}
        a11ySuggestionsListLabel={"Suggested mentions"}
      >
        <Mention
          markup="@[__display__](user:__id__)"
          trigger="@"
          data={data}
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <div className={`user ${focused ? 'focused' : ''}`}>
              {highlightedDisplay}
            </div>
          )}
          onAdd={onAdd}
          style={defaultMentionStyle}
        />

        <Mention
          markup="@[__display__](field:__id__)"
          trigger="$"
          data={fieldNames.map(fn => { return { display: fn + ':', id: fn } })}
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <div
              className={`user ${focused ? 'focused' : ''}`}
            >
              {highlightedDisplay}
            </div>
          )}
          onAdd={onAdd}
          style={{ backgroundColor: '#ebc8d0' }}
        />

        <Mention
          markup="@[__display__](artifact:__id__)"
          trigger="$$"
          data={artifactTypes.map(fn => { return { display: fn, id: fn } })}
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <div className={`user ${focused ? 'focused' : ''}`}>
              {highlightedDisplay}
            </div>
          )}
          onAdd={onAdd}
          style={{ backgroundColor: '#e3a09d' }}
        />

        <Mention
          markup="@[__display__](email:__id__)"
          trigger={emailRegex}
          data={(search) => [{ id: search, display: search }]}
          onAdd={onAdd}
          style={{ backgroundColor: '#d1c4e9' }}
        />
      </MentionsInput>
    </div>
  )
}

const artifactTypes = [
  "email", 
  "journal", 
  "scrap",
  "receipt",
  "stub",
  "statement",
  "mail",
  "letter",
  "card",
  "postcard",
  "ticket",
  "printout",
  "note",
  "envelope",
  "paystub",
  "appointment",
  "business",
  "contact",
  "timeline",
  "budget",
  "magazine",
  "photo",
  "photocopy",
  "calendar",
  "art",
  "school",
  "schoolwork",
  "program",
  "boarding",
  "certificate",
  "schedule",
  "poster",
  "posterboard",
  "promo",
  "check",
  "pass",
  "badge",
  "slip"
]
const fieldNames = [
  "from", 
  "to", 
  "sent", 
  "subject", 
  "page", 
  "when", 
  "where",
  "balance",
  "deposit",
  "withdrawal",
  "meal",
  "items",
  "event",
  "amount",
  "author"
]

export default CommentaryBox;