import React from "react";
import "./pagination.css";
import { connect } from "react-redux";
import { addMovies } from "../../actions";
import store from "../../store";
export class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: 0,
      last: 10,
      pageNumber: [],
      slicedPage: [],
      paginated: false,
    };
    this.unSubscribe = store.subscribe(() => {
      if (store.getState().movies.total_pages < 10) {
        this.setState({
          pageNumber: new Array(this.props.pages)
            .fill(null)
            .map((item, i) => i + 1),
          slicedPage: new Array(this.props.pages)
            .fill(null)
            .map((item, i) => i + 1),
          paginated: false,
        });
      } else if (
        !this.state.paginated &&
        store.getState().movies.total_pages > 10
      ) {
        this.createPagesArray();
      }
    });
  }
  componentDidMount() {
    this.createPagesArray();
  }
  componentWillUnmount() {
    this.unSubscribe();
  }
  createPagesArray = () => {
    var lclArray = [];
    for (let i = 1; i < this.props.pages; i++) {
      lclArray.push(i);
    }
    this.setState({ pageNumber: lclArray }, () => {
      this.setState({
        slicedPage: this.state.pageNumber.slice(
          this.state.one,
          this.state.last
        ),
      });
    });
  };

  onPageNumClicked = (e, number) => {
    var liBtns = document.querySelectorAll(".pagination_link button");
    for (let i = 0; i < liBtns.length; i++) {
      const element = liBtns[i];
      element.style.textDecoration = "none";
    }
    e.target.style.textDecoration = "underline";
    if (number > this.props.pages) {
      return;
    }

    let l = number + 5;
    let o = number - 4;

    if (l > this.props.pages) {
      l = this.props.pages;
    }
    if (o < 1) {
      o = 1;
    }
    var curLength = l - o + 1; // current pagination llist length eg 9 to 15 = 7
    var requiredMorePagesToAdd;
    if (curLength < 10) {
      requiredMorePagesToAdd = 10 - curLength; // required more pages to add to make length 10 .. eg 10 - 7 = 3
      if (o > 1) {
        var availableItemsAtBeginning = o - 1; // how many item are available to left side // 9 - 1 = 8
        if (availableItemsAtBeginning >= requiredMorePagesToAdd) {
          // cannot add all elemenet s.. so add till we have list of size 10 , 8> 3
          o = o - requiredMorePagesToAdd;
        } else {
          o = o - availableItemsAtBeginning;
        }
      }
    }

    curLength = l - o + 1;
    if (curLength < 10) {
      requiredMorePagesToAdd = 10 - curLength; // required more pages to add to make length 10 .. eg 10 - 7 = 3
      if (l < this.props.pages) {
        var availableItemsAtEnd = this.props.pages - l; // how many item are available to left side // 9 - 1 = 8
        if (availableItemsAtEnd >= requiredMorePagesToAdd) {
          // cannot add all elemenet s.. so add till we have list of size 10 , 8> 3
          l = l + requiredMorePagesToAdd;
        } else {
          l = l + availableItemsAtEnd;
        }
      }
    }
    this.loadPage(number);
    this.setState({
      slicedPage: this.state.pageNumber.slice(o - 1, l),
      paginated: true,
    });
  };
  loadPage = (number) => {
    this.props.addMovies(this.props.type, number);
  };
  render() {
    return (
      <div className="pagination">
        <ul className="pagination_wrapper">
          {this.state.slicedPage.map((number) => (
            <li key={number} className="pagination_link">
              <button
                onClick={(e) => {
                  this.onPageNumClicked(e, number);
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
const mapStateToProps = (state) => ({
  type: state.movies.type,
  pages: state.movies.total_pages,
});
export default connect(mapStateToProps, { addMovies })(Pagination);
