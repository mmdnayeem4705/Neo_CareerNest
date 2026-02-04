package com.neoorganization.careernestbackend.service;

import com.neoorganization.careernestbackend.model.Application;
import com.neoorganization.careernestbackend.model.ApplicationAction;
import com.neoorganization.careernestbackend.model.ApplicationStatus;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.repository.ApplicationActionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ApplicationActionService {

    private final ApplicationActionRepository applicationActionRepository;

    public ApplicationAction recordStatusChange(Application application, ApplicationStatus from, ApplicationStatus to, String notes, User performedBy) {
        ApplicationAction action = new ApplicationAction();
        action.setApplication(application);
        action.setActionType(ApplicationAction.ActionType.STATUS_UPDATED);
        action.setFromStatus(from);
        action.setToStatus(to);
        action.setNotes(notes);
        action.setPerformedBy(performedBy);
        action.setPerformedAt(LocalDateTime.now());
        return applicationActionRepository.save(action);
    }

    public java.util.List<ApplicationAction> getActionsForApplication(Long applicationId) {
        return applicationActionRepository.findByApplication_IdOrderByPerformedAtDesc(applicationId);
    }
}
