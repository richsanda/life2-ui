import { Mention, MentionsInput } from 'react-mentions'

import defaultStyle from '../../styles/defaultStyle'
import defaultMentionStyle from '../../styles/defaultMentionStyle'
import { Person, Tag, Trove } from '../../models';

interface CommentaryBoxProps {
  value,
  onChange,
  onAdd,
  personOptions?: Person[],
  troveOptions?: Trove[],
  tagOptions?: Tag[],
  onKeyPress?: any
}

function CommentaryBox(props: CommentaryBoxProps) {

  const {
    value = '',
    onChange,
    onAdd,
    personOptions = [],
    troveOptions = [],
    tagOptions = [],
    onKeyPress } = props;

  return (
    <div>

      <MentionsInput
        autoFocus
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
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
          markup="![__display__](trove:__id__)"
          trigger="!"
          data={troveOptions.map((p) => { return { id: p.name, display: p.name } })}
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
          data={tagOptions.map((p) => { return { id: p.name, display: p.name } })}
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
          data={fieldNames.map(fn => { return { display: fn, id: fn } })}
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
  "flier",
  "note",
  "notebook",
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
  "work",
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
  "slip",
  "apartment",
  "gathering",
  "party",
  "house",
  "place",
  "mention",
  "era",
  "residence",
  "roadtrip",
  "songs",
  "stateline",
  "mixtape"
]
const fieldNames = [
  "from",
  "to",
  "sent",
  "subject",
  "page",
  "when",
  "where",
  "why",
  "balance",
  "deposit",
  "withdrawal",
  "meal",
  "items",
  "event",
  "amount",
  "author",
  "title",
  "artist"
]

export default CommentaryBox;