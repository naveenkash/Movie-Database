import React from "react";
import "./pagination.css";
import { connect } from "react-redux";
// import store from "../../store";
import { all_Movies } from "../../actions";
export class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: 0,
      last: 10,
      pageNumber: [],
      slicedPage: []
    };
  }
  componentDidMount() {
    if (this.props.pages) {
      var lclArray = [];
      for (let i = 1; i < this.props.pages; i++) {
        lclArray.push(i);
      }
      this.setState({ pageNumber: lclArray }, () => {
        this.setState({
          slicedPage: this.state.pageNumber.slice(
            this.state.one,
            this.state.last
          )
        });
      });
    }
  }
  loadPage = number => {
    let halfPage = Math.floor(this.state.one + this.state.last) / 2;
    if (number >= halfPage) {
      if (number >= this.props.pages) {
        return;
      }
      this.setState(
        { one: (this.state.one += 5), last: (this.state.last += 5) },
        () => {
          if (
            this.state.slicedPage[this.state.slicedPage.length - 1] >=
            this.props.pages
          ) {
            
            return;
          }
          this.setState({
            slicedPage: this.state.pageNumber.slice(
              this.state.one,
              this.state.last
            )
          });
          this.props.all_Movies(this.props.type, number);
        }
      );
    } else if (number < halfPage) {
      if (this.state.one >= 5) {
        this.setState({
          one: (this.state.one -= 5),
          last: (this.state.last -= 5)
        });
      }
      
      this.setState({
        slicedPage: this.state.pageNumber.slice(this.state.one, this.state.last)
      });
      this.props.all_Movies(this.props.type, number);
    }
  };
  render() {
    return (
      <div className="pagination">
        <ul className="pagination_wrapper">
          {this.state.slicedPage.map(number => (
            <li key={number} className="pagination_link">
              <button
                onClick={() => {
                  this.loadPage(number);
                }}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  type: state.all_Movies.type,
  pages: state.all_Movies.total_pages
});
export default connect(
  mapStateToProps,
  { all_Movies }
)(Pagination);
