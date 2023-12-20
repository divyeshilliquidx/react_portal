<div className="modal-dialog modal-lg">
  <div className="modal-content">
    <div className="modal-header">
      <div className="clearfix">
        <div className="pull-right ">
          <button
            type="button"
            className="close"
            aria-label="Close"
            data-dismiss="modal"
          >
            <span aria-hidden="true" className="fa fa-close" />
          </button>
        </div>
        <h4 className="pull-left">Products</h4>
      </div>
    </div>
    <div className="modal-body">
      <div id="popupPageContainer" className="contentsDiv col-sm-12">
        <input type="hidden" id="parentModule" defaultValue="HelpDesk" />
        <input type="hidden" id="module" defaultValue="Products" />
        <input type="hidden" id="parent" defaultValue="" />
        <input type="hidden" id="sourceRecord" defaultValue="" />
        <input type="hidden" id="sourceField" defaultValue="product_id" />
        <input type="hidden" id="url" defaultValue="" />
        <input type="hidden" id="multi_select" defaultValue="" />
        <input type="hidden" id="currencyId" defaultValue="" />
        <input type="hidden" id="relatedParentModule" defaultValue="" />
        <input type="hidden" id="relatedParentId" defaultValue="" />
        <input type="hidden" id="view" name="view" defaultValue="Popup" />
        <input type="hidden" id="relationId" defaultValue="" />
        <input type="hidden" id="selectedIds" name="selectedIds" />
        <div id="popupContents" className="">
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                "\n                                                                                                                                                                                                        "
            }}
          />
          <div className="row">
            <div className="col-md-2">&nbsp;</div>
            <div className="col-md-10">
              
              <div className="listViewActions">
                <div className="btn-group pull-right">
                  <button
                    type="button"
                    id="PreviousPageButton"
                    className="btn btn-default"
                    disabled=""
                  >
                    <i className="fa fa-caret-left" />
                  </button>
                  <button
                    type="button"
                    id="PageJump"
                    data-toggle="dropdown"
                    className="btn btn-default"
                  >
                    <i className="fa fa-ellipsis-h icon" title="Page Jump" />
                  </button>
                  <ul
                    className="listViewBasicAction dropdown-menu"
                    id="PageJumpDropDown"
                  >
                    <li>
                      <div className="listview-pagenum">
                        <span>Page</span>&nbsp;
                        <strong>
                          <span>1</span>
                        </strong>
                        &nbsp;
                        <span>of</span>&nbsp;
                        <strong>
                          <span id="totalPageCount" />
                        </strong>
                      </div>
                      <div className="listview-pagejump">
                        <input
                          type="text"
                          id="pageToJump"
                          placeholder="Jump To"
                          className="listViewPagingInput text-center"
                        />
                        &nbsp;
                        <button
                          type="button"
                          id="pageToJumpSubmit"
                          className="btn btn-success listViewPagingInputSubmit text-center"
                        >
                          GO
                        </button>
                      </div>
                    </li>
                  </ul>
                  <button
                    type="button"
                    id="NextPageButton"
                    className="btn btn-default"
                    disabled=""
                  >
                    <i className="fa fa-caret-right" />
                  </button>
                </div>
                <span
                  className="pageNumbers  pull-right"
                  style={{ position: "relative", top: 7 }}
                >
                  <span className="pageNumbersText">1 to 1 </span>
                  &nbsp;
                  <span
                    className="totalNumberOfRecords cursorPointer"
                    title="Click for this list size"
                  >
                    of <i className="fa fa-question showTotalCountIcon" />
                  </span>
                  &nbsp;&nbsp;
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <input type="hidden" id="pageNumber" defaultValue={1} />
              <input type="hidden" id="pageLimit" defaultValue={20} />
              <input type="hidden" id="noOfEntries" defaultValue={1} />
              <input type="hidden" id="pageStartRange" defaultValue={1} />
              <input type="hidden" id="pageEndRange" defaultValue={1} />
              <input type="hidden" id="previousPageExist" defaultValue="" />
              <input type="hidden" id="nextPageExist" defaultValue="" />
              <input type="hidden" id="totalCount" defaultValue={0} />
              <input type="hidden" defaultValue="[]" id="currentSearchParams" />
              <div className="contents-topscroll">
                <div className="topscroll-div">&nbsp;</div>
              </div>
              <div
                className="popupEntriesDiv relatedContents mCustomScrollbar _mCS_9"
                style={{ height: 400 }}
              >
                <div
                  id="mCSB_9"
                  className="mCustomScrollBox mCS-dark-thick mCSB_vertical_horizontal mCSB_inside"
                  tabIndex={0}
                >
                  <div
                    id="mCSB_9_container_wrapper"
                    className="mCSB_container_wrapper mCS_y_hidden mCS_no_scrollbar_y"
                  >
                    <div
                      id="mCSB_9_container"
                      className="mCSB_container"
                      style={{
                        position: "relative",
                        top: 0,
                        left: 0,
                        width: 1343
                      }}
                      dir="ltr"
                    >
                      <input type="hidden" defaultValue="" id="orderBy" />
                      <input type="hidden" defaultValue="ASC" id="sortOrder" />
                      <div className="popupEntriesTableContainer ">
                        <table className="listview-table table-bordered listViewEntriesTable">
                          <thead>
                            <tr className="listViewHeaders">
                              <th className="">Product Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              className="listViewEntries"
                              
                              
                            >
                              
                              <td
                                className="listViewEntryValue value textOverflowEllipsis "
                                title="car product"
                              >
                                car product
                              </td>
                              <td
                                className="listViewEntryValue value textOverflowEllipsis "
                                title="car product"
                              >
                                car product
                              </td>
                    
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
