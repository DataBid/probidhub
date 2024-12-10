import { BidInvitations } from "../BidInvitations";

interface BidInvitationsSectionProps {
  userRole?: string;
}

export const BidInvitationsSection = ({ userRole }: BidInvitationsSectionProps) => {
  return (
    <div className="rounded-lg border bg-white shadow-sm p-3 sm:p-6">
      <BidInvitations userRole={userRole} />
    </div>
  );
};