var CONSTANTS = {
    usertypes : {
        "GENERAL_USER" : "GENERAL_USER",
        "FACILITY_MANAGER" : "FACILITY_MANAGER",
        "TOURNAMENTS_POSTER" : "TOURNAMENTS_POSTER",
        "ADMIN" : "ADMIN",
        "FT" : "FT", // FACILITY_MANAGER, FACILITY_MANAGER
        "FTG" : "FTG", // FACILITY_MANAGER, FACILITY_MANAGER, GENERAL_USER
        "INHERITED_USER" : "INHERITED_USER" // EXTENDED USER FOR  FT
    },
    
    // Active/Approved/Onhold/Canceled/Locked/VerificationPending/PendingforApproval/Rejected
    status : {
        "ACTIVE" : "ACTIVE",
        "APPROVED" : "APPROVED",
        "ONHOLD" : "ONHOLD",
        "CANCELLED" : "CANCELLED",
        "LOCKED" : "LOCKED",
        "VERIFICATION_PENDING" : "VERIFICATION_PENDING",
        "PENDING_FOR_APPROVAL" : "PENDING_FOR_APPROVAL",
        "REJECTED" : "REJECTED"
    },
    
    bookingtypes : {
        "TOTAL_GROUND" : "TOTAL_GROUND",
        "SINGLE_PLAYER" : "SINGLE_PLAYER"
    }
};

module.exports = CONSTANTS;
