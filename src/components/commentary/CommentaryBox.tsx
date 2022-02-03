import { useEffect, useState } from 'react'

import { Mention, MentionsInput } from 'react-mentions'

import defaultStyle from '../Neat/defaultStyle'
import defaultMentionStyle from '../Neat/defaultMentionStyle'
import { Person, Trove } from '../../models';
import ArtifactAPI from '../../hooks/artifactApi';

function CommentaryBox({ value, onChange, onAdd }) {

  const [personOptions, setPersonOptions] = useState<Person[]>([]);
  const [troveOptions, setTroveOptions] = useState<Trove[]>([]);

  useEffect(() => {
    ArtifactAPI.persons().then((response) => {
      setPersonOptions(response);
    })
    ArtifactAPI.troves().then((response) => {
      setTroveOptions(response);
    })
  }, [])

  return (
    <div>

      <MentionsInput
        value={value}
        onChange={onChange}
        style={defaultStyle}
        placeholder={"'@' for people; '$' for fields; '$$' for type; '#' for topics"}
        a11ySuggestionsListLabel={"Suggested mentions"}
      >
        <Mention
          markup="@[__display__](user:__id__)"
          trigger="@"
          data={personOptions.map((p) => { return { id: p.name, display: p.name } })}
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
          markup="#[__display__](tag:__id__)"
          trigger="#"
          data={[]}
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
          markup="#[__display__](story:__id__)"
          trigger="##"
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
          style={defaultMentionStyle}
        />

        <Mention
          markup="$[__display__](field:__id__)"
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
          markup="$[__display__](artifact:__id__)"
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

        {/* <Mention
          markup="@[__display__](email:__id__)"
          trigger={emailRegex}
          data={(search) => [{ id: search, display: search }]}
          onAdd={onAdd}
          style={{ backgroundColor: '#d1c4e9' }}
        /> */}
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