// Reply "running figure" mark, split into body and head so each can animate on its own.
// Decorative: the company name is always written out next to it.
function ReplyLogo() {
  return (
    <svg className="reply-logo" viewBox="0 0 1548 1548" aria-hidden="true" focusable="false">
      <path
        className="reply-logo__body"
        pathLength="1"
        d="M1248.3 352.7l-82.4-131.9c-7.5-11.7-19.9-18.8-33.8-18.4l-355.4 2.3h-194.9c-15.4 0-22.1 19.1-10.1 28.4l54.3 44.3c7.9 6 16.9 10.1 26.7 12l338.5 63.7-418.8 449.4-551 77.9c-19.2 2.7-27.4 25.9-14.3 39.8l54 57.7c10.5 11.2 25.5 17.6 41.2 17.6l532-9c19.9-0.4 39-5.6 55.9-15.7l127.4-77.6 269.2 213.3c10.5 8.2 17.6 20.2 19.1 33.7l51.4 376.7c2.2 17.6 17.6 30.7 35.6 30.7h27.3c19.5 0 35.6-15.7 35.6-35.6l1.9-417.9c0-21.4-6.7-42.4-19.8-59.6l-234.7-316 49.1-66.3 193.8-254.9c10.1-12.7 10.9-30.7 2.2-44.6z"
      />
      <circle className="reply-logo__head" cx="1392.7" cy="155.4" r="155.1" />
    </svg>
  )
}

export default ReplyLogo
