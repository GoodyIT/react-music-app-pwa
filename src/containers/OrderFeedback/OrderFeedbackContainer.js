import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import Component from "../../components/OrderFeedback/OrderFeedbackComponent";
import {
  updateOrderData,
  submitPayment,
  uploadAudioFileToIPFS,
  updateTrackDetails,
  addAnotherTrack,
  removeTrack,
  resetState,
} from "../../state/actions/orderActions";
import { orderSelector } from "../../state/selectors/order";
import { ENUMS } from "../../utils";
import { getGenres } from "../../state/actions/preferencesActions";
import { toast } from "react-toastify";

const OrderFeedbackContainer = ({
  accountName,
  tracks,
  genres,
  isSaveCardDetails,
  dispatchUpdate,
  dispatchTrackUpdate,
  dispatchAddNewTrack,
  dispatchGetGenres,
  dispatchRemoveTrack,
  history,
  dispatchResetState,
}) => {
  useEffect(() => {
    if (!localStorage.getItem("x-access-token")) {
      history && history.push("/signin");
    }
  }, [history]);

  useEffect(() => {
    dispatchGetGenres();
  }, [dispatchGetGenres]);

  const [shouldCreateToken, setShouldCreateToken] = useState(false);
  const [isPremium, setIsPremium] = useState(
    !!localStorage.getItem("isPremiumUser")
  );
  const [isHyperTargeted, setIsHyperTargeted] = useState(
    !!localStorage.getItem("isPremiumUser")
  );
  const [isAddPremium, setAddPremium] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const getTotalAmount = useCallback(() => {
    const amount = tracks.reduce((total, track) => {
      return total + track.selectedFeedback;
    }, 0);
    return amount;
  }, [tracks]);
  const validateFormData = useCallback(() => {
    const isFormError = tracks.some((track) => {
      if (track.trackTitle.length < 1) {
        toast.error("Enter track title");
        return true;
      } else {
        if (track.mediaType === ENUMS.MEDIA_TYPE_FILEUPLOAD) {
          if (!track.fileUpload) {
            toast.error("Upload file or upload YouTube url");
            return true;
          }
        } else {
          if (track.trackUrl.length === 0) {
            toast.error("Upload file or upload YouTube url");
          }
          return track.trackUrl.length === 0;
        }
        if (!track.genreId) {
          toast.error("Select a genre for the tracks");
        }
      }
      return false;
    });
    return isFormError;
  }, [tracks]);
  const onSubmitPayment = useCallback(
    async (cardInfo) => {
      if (validateFormData()) {
        setIsError(true);
        return;
      }

      const tracksToUpload = tracks.map((track, index) => {
        delete track.fileToUpload;
        track.id = index;
        track.genreId = [track.genreId];
        return track;
      });
      setIsProcessing(true);
      const payload = {
        tracks: tracksToUpload,
        saveCardDetails: isSaveCardDetails,
        amount: getTotalAmount(),
        currency: "USD",
        paymentToken: cardInfo.id,
        isAddPremium,
      };

      const response = await submitPayment(payload);
      if (response.ok) {
        const data = await response.json();
        await Promise.all(
          tracksToUpload.map(async ({ id, mediaType, fileUpload }) => {
            if (mediaType === ENUMS.MEDIA_TYPE_FILEUPLOAD) {
              const { feedbackId } = data.find((track) => track.trackId === id);
              const formData = new FormData();
              formData.append("trackUpload", fileUpload);
              const uploadFileResponse = await uploadAudioFileToIPFS(
                formData,
                feedbackId
              );
            }
          })
        ).then(() => {
          setIsProcessing(false);
          setIsSuccess(true);
          if (isAddPremium) {
            setIsPremium(true);
            localStorage.setItem("isPremiumUser", String(true))
          }
        });
      }
    },
    [tracks, getTotalAmount, validateFormData, isAddPremium, isSaveCardDetails]
  );

  const handleInputChange = useCallback(
    (e) => {
      let payload = {};
      if (e.target.name === "isAddPremium") {
        setAddPremium(e.target.checked);
      } else {
        if (e.target.name === "saveCardDetails") {
          payload = {
            [e.target.name]: e.target.checked,
          };
        } else {
          payload = {
            [e.target.id]: e.target.value,
          };
        }
        dispatchUpdate(payload);
      }
    },
    [dispatchUpdate]
  );
  const handleSaveCardChanges = useCallback(
    (cardInfo) => {
      setShouldCreateToken(false);
      onSubmitPayment(cardInfo);
    },
    [onSubmitPayment]
  );

  const handleOrderNowClick = useCallback(() => {
    setShouldCreateToken(true);
  }, []);

  const handleTrackUpdates = useCallback(
    (e, index) => {
      if (e.id) {
        dispatchTrackUpdate(
          {
            [e.id]: e.value,
          },
          index
        );
      } else if (
        e.target.id === "fileUpload" &&
        e.target.files &&
        e.target.files.length > 0
      ) {
        dispatchTrackUpdate({ fileUpload: e.target.files[0] }, index);
      } else {
        dispatchTrackUpdate(
          {
            [e.target.id]: e.target.value,
          },
          index
        );
      }
    },
    [dispatchTrackUpdate]
  );

  const handlePaymentFormError = useCallback((e) => {
    console.log(e);
  }, []);

  const [menuIsOpen, handleClickMenuToggle] = useState(false);

  const setAddGenre = useCallback(
    (genre, index) => {
      dispatchTrackUpdate({ genreId: genre._id }, index);
    },
    [dispatchTrackUpdate]
  );

  const handleRemoveTrack = useCallback(
    (id) => {
      if (id === "premium") {
        setAddPremium(false);
      } else {
        dispatchRemoveTrack(id);
      }
    },
    [dispatchRemoveTrack]
  );

  return (
    <Component
      isProcessing={isProcessing}
      isPremium={isPremium}
      genres={genres}
      isSuccess={isSuccess}
      accountName={accountName}
      tracks={tracks}
      isSaveCardDetails={isSaveCardDetails}
      shouldCreateToken={shouldCreateToken}
      onInputChange={handleInputChange}
      totalAmount={getTotalAmount}
      isAddPremium={isAddPremium}
      saveCardInformation={handleSaveCardChanges}
      onSubmitFeedback={handleOrderNowClick}
      handlePaymentFormError={handlePaymentFormError}
      handleTrackChanges={handleTrackUpdates}
      isPaymentFormReady={true}
      handleAddAnotherTrack={dispatchAddNewTrack}
      menuIsOpen={menuIsOpen}
      handleClickMenuToggle={handleClickMenuToggle}
      setAddGenre={setAddGenre}
      handleRemoveTrack={handleRemoveTrack}
      handleLogoClick={() => history.push("/")}
      handleRateTrackClick={() => {
        history.push("/discover");
        setIsSuccess(false);
      }}
      handlePlaceNewOrderClick={() => {
        dispatchResetState();
        setIsSuccess(false);
      }}
      closeSuccessPopUp={() => setIsSuccess(false)}
      isHyperTargeted={isHyperTargeted}
    />
  );
};

const dispatchAction = (dispatch) => ({
  dispatchUpdate: (payload) => dispatch(updateOrderData(payload)),
  dispatchTrackUpdate: (payload, index) =>
    dispatch(updateTrackDetails(payload, index)),
  dispatchAddNewTrack: () => dispatch(addAnotherTrack()),
  dispatchGetGenres: () => dispatch(getGenres()),
  dispatchRemoveTrack: (id) => dispatch(removeTrack(id)),
  dispatchResetState: () => dispatch(resetState()),
});

export default connect(
  orderSelector,
  dispatchAction
)(OrderFeedbackContainer);
