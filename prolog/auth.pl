% Predefined list of admin wallet addresses
wallet_address(okp415zvyy33u5qpheln6t7q6s7lyf9vc3vz3v39h7n).
wallet_address(okp41wmxxxxcezmgmqakptelf6nypme5w00xu850qpj).

% Predicate to check if a given address is allowed
is_valid_address(Address) :-
    wallet_address(Address).

% Example usage:
% ?- is_valid_address(okp415zvyy33u5qpheln6t7q6s7lyf9vc3vz3v39h7n).
% true.
%
% ?- is_valid_address(okpyolo).
% false.