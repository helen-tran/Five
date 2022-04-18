import React from "react";
/* Created a test grid layout page for the team members to refer to */
const ResponsiveGrid = () => {
  return (
    <>
    <section className="_33">
      <div className="column">Hello World (33%)</div>
      <div className="column">Hello World (33%)</div>
      <div className="column">Hello World (33%)</div>
    </section>

    <section className="_50">
      <div className="column">
        Hello World (50%)
      </div>
      <div className="column">
        Hello World (50%)
      </div>
    </section>

    <section className="_50 _spacearound">
      <div className="column">
        Hello World (50%) with left gutter
      </div>
      <div className="column">
        Hello World (50%) with right gutter
      </div>
    </section>

    <section className="_25">
      <div className="column">
        Hello World (25%)
      </div>
      <div className="column">
        Hello World (25%)
      </div>
      <div className="column">
        Hello World (25%)
      </div>
      <div className="column">
        Hello World (25%)
      </div>
    </section>

    <section className="_25_75">
      <div className="column_left">
        Hello World (25%)
      </div>
      <div className="column_right">
        Hello World (75%)
      </div>
    </section>

    <section className="_33_66">
      <div className="column_left">
        Hello World (33%)
      </div>
      <div className="column_right">
        Hello World (66%)
      </div>
    </section>

    <section>
      <div className="column">
        Hello World (100%)
      </div>
    </section>
    </>
  )
}

export default ResponsiveGrid;