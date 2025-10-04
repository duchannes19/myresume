import React from 'react'

const SectionLoading = () => (
  <div className="section-loading" role="status" aria-live="polite">
    <span className="section-loading__spinner" aria-hidden="true" />
    <span className="visually-hidden">Loading section…</span>
  </div>
)

export default SectionLoading
