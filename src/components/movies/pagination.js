import React from "react";
import "./pagination.css";
import { connect } from "react-redux";
import store from "../../store";
import { all_Movies } from "../../actions";
export class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: 0,
      last: 10,
      total_pages: this.props.pages,
      pageNumber: [],
      slicedPage: []
    };
    store.subscribe(() => {
      if (store.getState().all_Movies.total_pages) {
        console.log(store.getState().all_Movies.total_pages);
        this.setState(
          { total_pages: store.getState().all_Movies.total_pages },
          () => {
            // let page = [];
            for (let i = 1; i < this.state.total_pages; i++) {
              this.setState(
                prevState => ({ pageNumber: [...prevState.pageNumber, i] }),
                () => {
                  // page.push(this.state.pageNumber[i])
                  // console.log(page);

                  this.setState({
                    one:
                      this.state.pageNumber.slice(
                        this.state.one,
                        this.state.last
                      ).length -
                      this.state.pageNumber.slice(
                        this.state.one,
                        this.state.last
                      ).length
                  });
                  this.setState({
                    last: this.state.pageNumber.slice(
                      this.state.one,
                      this.state.last
                    ).length
                  });
                  this.setState({
                    slicedPage: this.state.pageNumber.slice(
                      this.state.one,
                      this.state.last
                    )
                  });
                  console.log(this.state.one, this.state.last);
                }
              );
            }
          }
        );
      }
    });
  }
  // fetchMovie=()=>{

  // }
  loadPage = number => {
    if (this.state.slicedPage.length === this.state.total_pages) {
      return;
    }
    let halfPage = Math.round(this.state.one + this.state.last) / 2;
    if (number >= halfPage) {
      this.setState({ one: (this.state.one += 5) });
      this.setState({ last: (this.state.last += 5) });
      console.log(this.state.one, this.state.last);
      this.setState({
        slicedPage: this.state.pageNumber.slice(this.state.one, this.state.last)
      });
      this.props.all_Movies(this.props.type, number);
    //   return;
    } else if (number <= halfPage) {
      this.props.all_Movies(this.props.type, number);
      
      if (this.state.one <= 0) {
        return;
      }
      console.log(number, halfPage);

      this.setState({ one: (this.state.one -= 5) });
      this.setState({ last: (this.state.last -= 5) });
      console.log(this.state.one, this.state.last);
      this.setState({
        slicedPage: this.state.pageNumber.slice(this.state.one, this.state.last)
      });
    //   return;
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
  // movies: state.all_Movies.movies,
  pages: state.all_Movies.total_pages,
  type: state.all_Movies.type
});
export default connect(
  mapStateToProps,
  { all_Movies }
)(Pagination);
