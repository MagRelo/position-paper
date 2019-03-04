import React, { Component } from 'react';
import { connect } from 'react-redux';

import VoteOnProposal from 'components/lobby/voteOnProposal';
import ExecuteTrade from 'components/lobby/executeTrade';
import ProposeTrade from 'components/lobby/addProposal';

// isOpen - vote form
// !isOpen && !isPassed - no trade, clear
// !isOpen && isPassed && !isExecuted - execute trade form
// !isOpen && isPassed && isExecuted - trade history

// <div className="list">
// <div className="list-container">
//   {this.props.proposals.map(proposal => {
//     return (
//       <div key={proposal.groupproposalid} className="list-item">
//         <p>
//           Move {proposal.quantity * 100}%{' of '}
//           {proposal.fromasset} to {proposal.toasset}
//         </p>
//         <p>
//           ({proposal.totalVotes || 'x'}/{proposal.totalMembers || 'y'}
//           )
//         </p>

//         {proposal.isopen ? (
//           <VoteOnProposal
//             groupKey={this.props.groupkey}
//             userKey={this.props.selectedAccount}
//             proposalId={proposal.groupproposalid}
//             totalVotes={proposal.totalVotes}
//             totalMembers={proposal.totalMembers}
//             userVote={proposal.userVote}
//           />
//         ) : null}

//         {!proposal.isopen && proposal.ispassed ? (
//           <ExecuteTrade groupkey={this.props.groupkey} />
//         ) : null}

//         {!proposal.isopen && !proposal.ispassed ? (
//           <p>Did not pass, bummer.</p>
//         ) : null}
//       </div>
//     );
//   })}
// </div>
// </div>

class ProposalsList extends Component {
  render() {
    return (
      <section className="proposals">
        <h3>Add Proposal</h3>
        <ProposeTrade />
        <h3>Proposals</h3>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Proposal</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.proposals.map(proposal => {
              return (
                <tr key={proposal.groupproposalid}>
                  <td>
                    <p>
                      Move {proposal.quantity * 100}%{' of '}
                      {proposal.fromasset} to {proposal.toasset}
                    </p>
                  </td>
                  <td>
                    <p>
                      ({proposal.totalVotes || 'x'}/
                      {proposal.totalMembers || 'y'})
                    </p>
                  </td>

                  <td>
                    {proposal.isopen ? (
                      <VoteOnProposal
                        groupKey={this.props.groupkey}
                        userKey={this.props.selectedAccount}
                        proposalId={proposal.groupproposalid}
                        totalVotes={proposal.totalVotes}
                        totalMembers={proposal.totalMembers}
                        userVote={proposal.userVote}
                      />
                    ) : null}

                    {!proposal.isopen && proposal.ispassed ? (
                      <ExecuteTrade groupkey={this.props.groupkey} />
                    ) : null}

                    {!proposal.isopen && !proposal.ispassed ? (
                      <p>Did not pass, bummer.</p>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    proposals: state.lobby.proposals
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposalsList);
